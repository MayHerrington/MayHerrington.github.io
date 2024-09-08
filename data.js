export const weaponPresets = {
    default: { title: "Default", weaponShots: 2, damagePerShot: 1, clusterSize: 1 },
    lrm5: { title: "LRM5", weaponShots: 5, damagePerShot: 1, clusterSize: 5 },
    lrm10: { title: "LRM10", weaponShots: 10, damagePerShot: 1, clusterSize: 5 },
    lrm15: { title: "LRM15", weaponShots: 15, damagePerShot: 1, clusterSize: 5 },
    lrm20: { title: "LRM20", weaponShots: 20, damagePerShot: 1, clusterSize: 5 },
    srm2: { title: "SRM2", weaponShots: 2, damagePerShot: 2, clusterSize: 2 },
    srm4: { title: "SRM4", weaponShots: 4, damagePerShot: 2, clusterSize: 2 },
    srm6: { title: "SRM6", weaponShots: 6, damagePerShot: 2, clusterSize: 2 },
    streakSrm2: { title: "Streak SRM2", weaponShots: 2, damagePerShot: 2, clusterSize: 2, streak: true },
    streakSrm4: { title: "Streak SRM4", weaponShots: 4, damagePerShot: 2, clusterSize: 2, streak: true },
    streakSrm6: { title: "Streak SRM6", weaponShots: 6, damagePerShot: 2, clusterSize: 2, streak: true },
}

export const clusterHitTables = [
    [1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 12],
    [1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 12],
    [1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 18],
    [1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24],
    [1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24],
    [1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24],
    [2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24],
    [2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 32],
    [2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 32],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40],
];

export const BipedHitLocationList = {
    'H': 1,
    'CT': 2,
    'LT': 3,
    'RT': 4,
    'LA': 5,
    'RA': 6,
    'LL': 7,
    'RL': 8,
    'crit': 9,
}

export const BipedLocationName = {
    1: 'Head',
    2: 'Center Torso',
    3: 'Left Torso',
    4: 'Right Torso',
    5: 'Left Arm',
    6: 'Right Arm',
    7: 'Left Leg',
    8: 'Right Leg',
}

export const BipedLocationAbbreviation = {
    1: 'HD',
    2: 'CT',
    3: 'LT',
    4: 'RT',
    5: 'LA',
    6: 'RA',
    7: 'LL',
    8: 'RL',
}

export const Facing = {
    'Left': 0,
    'Front': 1,
    'Right': 2
}

export const BipedLocations = [
    [BipedHitLocationList.crit, BipedHitLocationList.crit, BipedHitLocationList.crit],
    [BipedHitLocationList.LL, BipedHitLocationList.RA, BipedHitLocationList.RL],
    [BipedHitLocationList.LA, BipedHitLocationList.RA, BipedHitLocationList.RA],
    [BipedHitLocationList.LA, BipedHitLocationList.RL, BipedHitLocationList.RA],
    [BipedHitLocationList.LL, BipedHitLocationList.RT, BipedHitLocationList.RL],
    [BipedHitLocationList.LT, BipedHitLocationList.CT, BipedHitLocationList.RT],
    [BipedHitLocationList.CT, BipedHitLocationList.LT, BipedHitLocationList.CT],
    [BipedHitLocationList.RT, BipedHitLocationList.LL, BipedHitLocationList.LT],
    [BipedHitLocationList.RA, BipedHitLocationList.LA, BipedHitLocationList.LA],
    [BipedHitLocationList.RL, BipedHitLocationList.LA, BipedHitLocationList.LL],
    [BipedHitLocationList.H, BipedHitLocationList.H, BipedHitLocationList.H]
];

