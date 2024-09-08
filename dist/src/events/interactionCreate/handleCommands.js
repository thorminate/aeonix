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
// When command is called run this
const config = require("../../../config.json");
const { devs, primaryServer } = config;
const getLocalCommands_1 = __importDefault(require("../../utils/getLocalCommands"));
module.exports = (bot, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // check if it's a chat input command, else return.
    if (!interaction.isChatInputCommand())
        return;
    // get already registered commands
    const localCommands = (0, getLocalCommands_1.default)();
    try {
        // check if command name is in localCommands
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        // if commandObject does not exist, return
        if (!commandObject)
            return;
        // if command is devOnly and user is not an admin, return
        if (commandObject.devOnly) {
            if ("id" in interaction.member && !devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only administrators can run this command",
                    ephemeral: true,
                });
                return;
            }
        }
        // if command is testOnly and user is not in primaryServer, return
        if (!(interaction.guild.id === primaryServer)) {
            interaction.reply({
                content: "Nuh uh, wrong server.",
                ephemeral: true,
            });
            return;
        }
        // if command requires permissions and user does not have aforementioned permission, return
        if ((_a = commandObject.permissionsRequired) === null || _a === void 0 ? void 0 : _a.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Access Denied",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        // if command requires bot permissions and bot does not have aforementioned permission, return
        if ((_b = commandObject.botPermissions) === null || _b === void 0 ? void 0 : _b.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        // if all goes well, run the commands callback function.
        yield commandObject.callback(bot, interaction);
    }
    catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
});
