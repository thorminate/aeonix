"use strict";
// exports the required exp to level up for a given level
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(level) {
    const output = level ** 2 * Math.log(level) || 1;
    const roundedOutput = Math.round(output);
    return roundedOutput;
}
