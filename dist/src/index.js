"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sharding!
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./dist/src/bot.js", {
    token: process.env.TOKEN,
});
manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn();
