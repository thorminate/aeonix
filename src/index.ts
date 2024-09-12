// Sharding!
import { ShardingManager } from "discord.js";

const manager = new ShardingManager("./dist/src/bot.js", {
  token: process.env.TOKEN,
});

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn();
