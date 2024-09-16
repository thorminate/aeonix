"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles the slash commands.
 * @param {Client} bot The instantiating client.
 * @param {Interaction} interaction The interaction that ran the command.
 */
const config_json_1 = require("../../../config.json");
const getLocalCommands_1 = __importDefault(require("../../utils/getLocalCommands"));
module.exports = async (bot, commandInteraction) => {
    if (!commandInteraction.isChatInputCommand())
        return;
    // get already registered commands
    const localCommands = (0, getLocalCommands_1.default)();
    try {
        // check if command name is in localCommands
        const commandObject = localCommands.find((cmd) => cmd.name === commandInteraction.commandName);
        // if commandObject does not exist, return
        if (!commandObject)
            return;
        // if command is devOnly and user is not an admin, return
        if (commandObject.devOnly) {
            if ("id" in commandInteraction.member &&
                !config_json_1.devs.includes(commandInteraction.member.id)) {
                commandInteraction.reply({
                    content: "Only administrators can run this command",
                    ephemeral: true,
                });
                return;
            }
        }
        // if command is testOnly and user is not in primaryServer, return
        if (!(commandInteraction.guild.id === config_json_1.primaryServer)) {
            commandInteraction.reply({
                content: "Nuh uh, wrong server.",
                ephemeral: true,
            });
            return;
        }
        // if command requires permissions and user does not have aforementioned permission, return
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!commandInteraction.member.permissions.has(permission)) {
                    commandInteraction.reply({
                        content: "Access Denied",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        // if command requires bot permissions and bot does not have aforementioned permission, return
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = commandInteraction.guild.members.me;
                if (!bot.permissions.has(permission)) {
                    commandInteraction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        // if all goes well, run the commands callback function.
        await commandObject.callback(bot, commandInteraction);
    }
    catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};
