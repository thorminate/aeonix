"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(bot, guildId) {
    // Export the function.
    let applicationCommands; // define applicationCommands.
    if (guildId) {
        // if guildId is not undefined
        const guild = await bot.guilds.fetch(guildId); // fetch guild
        applicationCommands = guild.commands;
    }
    else {
        applicationCommands = bot.application.commands;
    }
    await applicationCommands.fetch();
    return applicationCommands;
}
