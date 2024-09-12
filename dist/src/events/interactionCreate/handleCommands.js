"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// When command is called run this
const config = require("../../../config.json");
const { devs, primaryServer } = config;
const getLocalCommands_1 = __importDefault(require("../../utils/getLocalCommands"));
module.exports = async (bot, interaction) => {
    // check if it's a chat input command, else return.
    if (!interaction.isChatInputCommand())
        return;
    // get already registered commands
    const localCommands = await (0, getLocalCommands_1.default)();
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
        if (commandObject.permissionsRequired?.length) {
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
        if (commandObject.botPermissions?.length) {
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
        await commandObject.callback(bot, interaction);
    }
    catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};
