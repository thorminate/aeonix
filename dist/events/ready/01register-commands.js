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
exports.default = registerCommands;
// Register, edit and delete commands
const config = require("../../../config.json");
const { primaryServer } = config;
const areCommandsDifferent_1 = __importDefault(require("../../utils/areCommandsDifferent"));
const getApplicationCommands_1 = __importDefault(require("../../utils/getApplicationCommands"));
const getLocalCommands_1 = __importDefault(require("../../utils/getLocalCommands"));
function registerCommands(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Define local commands and application commands
            const localCommands = (0, getLocalCommands_1.default)();
            const applicationCommands = yield (0, getApplicationCommands_1.default)(bot, primaryServer);
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
                    if ((0, areCommandsDifferent_1.default)(existingCommand, localCommand)) {
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
}
