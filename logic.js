import { BipedHitLocationList, BipedLocationAbbreviation, BipedLocationName, BipedLocations, clusterHitTables, Facing } from "./data.js";

$(".weapon").click(function () {
    $(".clusterhit-size").val($(this).text());
    $(".clusterhit-roll").click();
});


$(".clusterhit-roll").click(function () {
    // User Inputs
    // ------------------------------------------------
    const weaponShots = $(".clusterhit-size").val();
    const damagePerShot = $(".clusterhit-shot-damage").val();
    const damagePerGroup = parseInt($(".clusterhit-size-damage").val()) || 1;

    const streak = document.getElementById("streak").checked;
    const ams = document.getElementById("ams").checked;
    const artemis = document.getElementById("artemis").checked;
    const additionalMods = parseInt($(".clusterhit-size-add").val()) || 0;
    const repeats = parseInt($(".clusterhit-size-repeats").val()) || 1;

    const facingFront = document.getElementById("facing-front").checked;
    const facingLeft = document.getElementById("facing-left").checked;
    const facingRight = document.getElementById("facing-right").checked;

    const floatingCrits = document.getElementById("floating-crits").checked;

    // Calculated Values
    // ------------------------------------------------
    const totalMods = additionalMods + (artemis ? 2 : 0) - (ams ? 4 : 0);

    let hitDirection = Facing.Front;
    if (facingLeft)
        hitDirection = Facing.Left
    else if (facingRight)
        hitDirection = Facing.Right


    // Roll locations
    // ------------------------------------------------
    const { hits, totals, originalDieRolls, netDamageTotal, allDamageGroups, hitOrder } = rollAll(weaponShots, damagePerShot, damagePerGroup, totalMods, hitDirection, streak, floatingCrits, repeats);


    // Report general info
    // ------------------------------------------------
    var rolled = $(".clusterhit-rolled");
    var amount = $(".clusterhit-amount");
    var groups = $(".clusterhit-groups");

    if (streak && !ams)
        rolled.html("You rolled a unmodified streak weapon for max damage");
    else {
        if (repeats == 1)
            rolled.html("You rolled <h1>(" + originalDieRolls[0] + "+" + totalMods + ")= " + totals[0] + "</h1>");
        else {
            rolledtext = "You rolled ";
            for (var i = 0; i < repeats; i++) {
                rolledtext = rolledtext.concat("<h2>(" + originalDieRolls[i] + "+" + totalMods + ")= " + totals[i] + "</h2>\n");
            }
            rolled.html(rolledtext);
        }
    }


    amount.html("You did <h1>" + netDamageTotal + " Damage total</h1>");
    groups.html("Grouping by " + damagePerGroup + " this would be <h1>" + allDamageGroups.join("-") + "</h1>");


    // Display locations
    // ------------------------------------------------
    var location = $(".clusterhit-locations");
    location.html("");

    Object.entries(hits).forEach(([location, hitList]) => {
        addResult(hitList, BipedLocationName[location]);
    })

    $(".click-highlight").click(function () {
        $(this).toggleClass("bg-success");
    });

    // Display hit order
    // ------------------------------------------------
    var hitOrderLocation = $(".hit-order");
    hitOrderLocation.html(hitOrder.map(x => String(x[0]) + " (" + String(x[1]) + ")").join(" -> "));


});


function addResult(hits, hitLocation) {
    const location = $(".clusterhit-locations");
    location.append("<tr class=\"click-highlight\">" +
        "<td class=\"text-center\">" + hitLocation + "</td>" +
        "<td class=\"text-center\">" + hits['hits'].join('-') + " (" + String(hits['total']) + ")" + "</td></tr>");
}

function rollAll(numShots, damagePerShot, clusterSize, clusterMod, facing, streak, floatingCrits, repeats) {
    var allDamageGroups = [];
    var totals = [];
    var originalDieRolls = [];
    var netDamageTotal = 0;
    var netNumDamageGroups = 0;
    for (var i = 0; i < repeats; i++) {
        const { damageGroups, total, originalDieRoll, damageTotal, numDamageGroups } = getClusters(numShots, damagePerShot, clusterSize, clusterMod, streak);
        allDamageGroups = allDamageGroups.concat(damageGroups);
        totals.push(total);
        originalDieRolls.push(originalDieRoll);
        netDamageTotal += damageTotal;
        netNumDamageGroups += numDamageGroups;
    }

    var hits = {
        [BipedHitLocationList.H]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.CT]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.LT]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.RT]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.LA]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.RA]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.LL]: { 'hits': [], 'total': 0 },
        [BipedHitLocationList.RL]: { 'hits': [], 'total': 0 },
    }
    const hitOrder = []
    for (var i = 0; i < allDamageGroups.length; i++) {
        var damageVal = allDamageGroups[i];
        var damageString = String(damageVal);
        var loc = BipedLocations[roll(2) - 2][facing];
        if (loc == BipedHitLocationList.crit) {
            if (floatingCrits) {
                while (loc == BipedHitLocationList.crit) {
                    loc = BipedLocations[roll(2) - 2][facing];
                }
            } else {
                if (facing == Facing.Left)
                    loc = BipedHitLocationList.LT
                else if (facing == Facing.Front)
                    loc = BipedHitLocationList.CT
                else if (facing == Facing.Right)
                    loc = BipedHitLocationList.RT
            }
            damageString = '<b>' + damageString + '*</b>'
        }
        hitOrder.push([BipedLocationAbbreviation[loc], damageString]);
        hits[loc]['hits'].push(damageString);
        hits[loc]['total'] += damageVal;

    }

    return { hits, totals, originalDieRolls, netDamageTotal, allDamageGroups, hitOrder }
}

function getClusters(numShots, damagePerShot, clusterSize, clusterMod, streak) {
    var size = numShots;
    var originalDieRoll = roll(2);
    var total = originalDieRoll;
    if (size == 40)
        size = 31;

    if (streak) {
        total = 11;
        originalDieRoll = 11;
    }

    total += clusterMod;
    if (total > 12)
        total = 12;
    else if (total < 2)
        total = 2;

    var numHits = clusterHitTables[total - 2][size - 2];
    var damageTotal = damagePerShot * numHits;
    var numGroups = Math.floor(damageTotal / clusterSize);
    var remainder = damageTotal - numGroups * clusterSize;
    var damageGroups = [];
    var numDamageGroups = damageGroups.length
    for (var i = 0; i < numGroups; i++) {
        damageGroups.push(clusterSize);
    }
    if (remainder > 0) {
        damageGroups.push(remainder);
    }

    return { damageGroups, total, originalDieRoll, damageTotal, numDamageGroups }
}


function roll(numberofDice) {
    if (numberofDice == 0)
        return 0;

    var tot = 0;
    for (var i = 0; i < numberofDice; i++) {
        tot += Math.floor(Math.random() * 6 + 1)
    }
    return tot;
}
