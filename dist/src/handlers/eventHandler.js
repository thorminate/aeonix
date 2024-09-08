"use strict";
// when an event is triggered, it runs all files in that event's folder
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventHandler;
const path_1 = __importDefault(require("path"));
const getAllFiles = require("../utils/getAllFiles");
function eventHandler(bot) {
    // Finds event folders
    const eventFolders = getAllFiles(path_1.default.join(__dirname, "..", "events"), true);
    // Gets event files
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a.localeCompare(b));
        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
        // Runs files in event folders if folder's name matches event name
        bot.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(bot, arg);
            }
        });
    }
}
