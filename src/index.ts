// Sharding!
import { ShardingManager } from "discord.js";
import * as ReadLine from "node:readline";

const manager = new ShardingManager("./dist/src/bot.js", {
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

      rl.on("line", (input: string) => {
        switch (input) {
          case "exit":
            console.log("Exit command received, shutting down...");
            manager.broadcastEval((c) => c.destroy());
            process.exit();

          case "help":
            console.log(
              `'exit' to quit and turn off the bot
'help' for help
'clear' to clear the console
'echo <text>' to echo text`
            );
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
            console.log(
              "Use 'exit' to quit and turn off the bot, or 'help' for help"
            );
            break;
        }

        rl.prompt();
      });
    }, 100);
  })
  .catch((error) => {
    console.error(
      `The shard failed to launch: ${error}\n Attempting to restart...`
    );

    setTimeout(() => {
      manager.spawn();
    }, 5000);
  });
