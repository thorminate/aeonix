"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (bot) => {
    console.clear();
    console.log(`Logged in as ${bot.user.tag}!
  System Info:
    Running on ${await bot.shard.fetchClientValues("guilds.cache.size")} server(s)!
    Running with ${await bot.shard.fetchClientValues("users.cache.size")} member(s)!
    API Latency: ${bot.ws.ping}ms
    Shards: ${bot.shard.count}`);
};
