"use strict";
// when an event is triggered, it runs all files in that event's folder
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("../utils/getAllFiles"));
module.exports = (bot) => {
    // Finds event folders
    const eventFolders = (0, getAllFiles_1.default)(path_1.default.join(__dirname, "..", "events"), true);
    // Gets event files
    for (const eventFolder of eventFolders) {
        const eventFiles = (0, getAllFiles_1.default)(eventFolder);
        eventFiles.sort((a, b) => a.localeCompare(b));
        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
        // Runs files in event folders if folder's name matches event name
        bot.on(eventName, (arg) => __awaiter(void 0, void 0, void 0, function* () {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                yield eventFunction(bot, arg);
            }
        }));
    }
};
