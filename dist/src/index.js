"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sharding!
const discord_js_1 = require("discord.js");
const manager = new discord_js_1.ShardingManager("./dist/src/bot.js", {
    token: process.env.TOKEN,
});
manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn();
