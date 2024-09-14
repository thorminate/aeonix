import { Client } from "discord.js"; // Get the discord.js library.

export default async function (bot: Client, guildId: string | null) {
  // Export the function.
  let applicationCommands: any; // define applicationCommands.

  if (guildId) {
    // if guildId is not undefined
    const guild = await bot.guilds.fetch(guildId); // fetch guild
    applicationCommands = guild.commands; // get guild commands
  } else {
    // if guildId is undefined
    applicationCommands = bot.application.commands; // get global commands
  }

  await applicationCommands.fetch(); // fetch commands
  return applicationCommands; // return commands
}
