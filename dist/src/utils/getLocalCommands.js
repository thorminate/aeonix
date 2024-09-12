"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// function to get all local commands
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("../utils/getAllFiles"));
exports.default = async (exceptions = []) => {
    // define local commands as an array
    let localCommands = [];
    // get all command categories and store in an array
    const commandCategories = (0, getAllFiles_1.default)(path_1.default.join(__dirname, "..", "commands"), true);
    // loop through all command categories...
    for (const commandCategory of commandCategories) {
        const commandFiles = (0, getAllFiles_1.default)(commandCategory);
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
};
