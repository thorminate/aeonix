"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const discord_js_1 = require("discord.js");
function default_1(buttons) {
    const components = [];
    let currentRow = new discord_js_1.ActionRowBuilder();
    for (let a = 0; a < buttons.length && a < 25; a++) {
        if (a % 5 === 0 && a > 0) {
            components.push(currentRow);
            currentRow = new discord_js_1.ActionRowBuilder();
        }
        currentRow.addComponents(buttons[a]);
    }
    if (currentRow.components.length > 0) {
        components.push(currentRow);
    }
    return components;
}
