"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLocalCommands;
// function to get all local commands
const path_1 = __importDefault(require("path"));
const getAllFiles = require("../utils/getAllFiles");
function getLocalCommands(exceptions = []) {
    // define local commands as an array
    let localCommands = [];
    // get all command categories and store in an array
    const commandCategories = getAllFiles(path_1.default.join(__dirname, "..", "commands"), true);
    // loop through all command categories...
    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);
        // ...and perform the following:
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);
            if (exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject);
        }
    }
    return localCommands;
}
