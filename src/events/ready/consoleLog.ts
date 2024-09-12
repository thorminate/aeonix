// when the bot is ready, log it to the console
import { Client } from "discord.js";

module.exports = (bot: Client) => {
  console.log(`${bot.user.username} is now online!`);
};
