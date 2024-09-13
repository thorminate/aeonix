// when the bot is ready, log it to the console
import { Client } from "discord.js";

module.exports = async (bot: Client) => {
  console.clear();
  console.log(
    `Logged in as ${bot.user.tag}!
  System Info:
    Running on ${await bot.shard.fetchClientValues(
      "guilds.cache.size"
    )} server(s)!
    Running with ${await bot.shard.fetchClientValues(
      "users.cache.size"
    )} member(s)!
    API Latency: ${bot.ws.ping}ms
    Shards: ${bot.shard.count}`
  );
};
