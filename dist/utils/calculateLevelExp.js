"use strict";
// exports the required exp to level up for a given level
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculateLevelExp;
function calculateLevelExp(level) {
    const output = Math.pow(level, 2) * Math.log(level) || 1;
    const roundedOutput = Math.round(output);
    return roundedOutput;
}
