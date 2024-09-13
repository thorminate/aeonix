"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Sharding!
const discord_js_1 = require("discord.js");
const ReadLine = __importStar(require("node:readline"));
const manager = new discord_js_1.ShardingManager("./dist/src/bot.js", {
    token: process.env.TOKEN,
    respawn: true,
});
manager.on("shardCreate", (shard) => {
    console.log(`Launched shard ${shard.id}`);
});
manager
    .spawn()
    .then(() => {
    setTimeout(() => {
        const rl = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.setPrompt("> ");
        rl.prompt();
        rl.on("line", (input) => {
            switch (input) {
                case "exit":
                    console.log("Exit command received, shutting down...");
                    manager.broadcastEval((c) => c.destroy());
                    process.exit();
                case "help":
                    console.log(`'exit' to quit and turn off the bot
'help' for help
'clear' to clear the console
'echo <text>' to echo text`);
                    break;
                case "clear":
                    console.clear();
                    break;
                case "echo":
                    const echo = rl.question("Text: ", (text) => {
                        console.log(text);
                    });
                    break;
                default:
                    console.error("Invalid command");
                    console.log("Use 'exit' to quit and turn off the bot, or 'help' for help");
                    break;
            }
            rl.prompt();
        });
    }, 100);
})
    .catch((error) => {
    console.error(`The shard failed to launch: ${error}\n Attempting to restart...`);
    setTimeout(() => {
        manager.spawn();
    }, 5000);
});
