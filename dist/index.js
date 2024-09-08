"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./dist/bot.js", {
    token: process.env.TOKEN,
});
manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn();
