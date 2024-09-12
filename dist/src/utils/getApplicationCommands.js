"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(bot, guildId) {
    //define applicationCommands.
    let applicationCommands;
    // if guildId is not undefined, fetch guild commands. else fetch global commands.
    if (guildId) {
        const guild = await bot.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    }
    else {
        applicationCommands = bot.application.commands;
    }
    // fetch and return application commands.
    await applicationCommands.fetch();
    return applicationCommands;
}
