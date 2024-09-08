"use strict";
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
// Register, edit and delete commands
const config_json_1 = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands_1 = __importDefault(require("../../utils/getLocalCommands"));
module.exports = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define local commands and application commands
        const localCommands = (0, getLocalCommands_1.default)();
        const applicationCommands = yield getApplicationCommands(bot, config_json_1.primaryServer);
        // loop through all local commands
        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
            if (!name) {
                continue;
            }
            // check if command already exists and store in a variable
            const existingCommand = yield applicationCommands.cache.find((cmd) => cmd.name === name);
            // if command exists, check if it's set to be deleted
            if (existingCommand) {
                if (localCommand.deleted) {
                    // if it's set to be deleted, then delete it
                    yield applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}".`);
                    continue;
                }
                // if commands are different, then update it.
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    yield applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    // log edited command
                    console.log(`Edited command "${name}".`);
                }
            }
            else {
                // if command is set to be deleted, then skip registering it.
                if (localCommand.deleted) {
                    console.log(`Skipping to register command "${name}" as its set to delete.`);
                    continue;
                }
                // register command
                yield applicationCommands.create({
                    name,
                    description,
                    options,
                });
                console.log(`Registered command "${name}".`);
            }
        }
    }
    catch (error) {
        console.log(`There was an error: ${error}`);
    }
});
