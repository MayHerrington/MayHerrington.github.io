import { weaponPresets } from "./data.js"

export function loadPresets() {
    const weaponDropDown = document.getElementById("weaponPresets")

    Object.entries(weaponPresets).forEach(([weaponId, weaponData]) => {
        var weapon = document.createElement('option');
        weapon.text = weaponData.title
        weapon.value = weaponId;
        weaponDropDown.appendChild(weapon);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    loadPresets()
}, false);