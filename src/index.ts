// This is the entrypoint for the the script.
// This essentially divides the bot into multiple shards for more efficiency.
import fs from "node:fs";
import ReadLine from "node:readline"; // Then we import the readline module, this is used later for the CLI.
import { promisify } from "node:util";
import { ShardingManager } from "discord.js"; // First, we import the ShardingManager.
import { config } from "dotenv";
import log from "./utils/log";

(async () => {
  if (!fs.existsSync("./.env")) {
    // If the .env file doesn't exist, we create it.
    // If the .env file doesn't exist, we create it.
    const rl = ReadLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const prompt = promisify(rl.question).bind(rl);

    const token = await prompt("Enter your token: ");
    fs.writeFileSync("./.env", `TOKEN="${token}"`);

    const mongodbUri = await prompt("Enter your MongoDB URI: ");
    fs.appendFileSync("./.env", `\nMONGODB_URI="${mongodbUri}"`);

    const playerRoleId = await prompt("What ID does the player role have? ");
    fs.appendFileSync("./.env", `\nPLAYER_ROLE="${playerRoleId}"`);

    const onboardingChannelId = await prompt(
      "What ID does the onboarding channel have? "
    );
    fs.appendFileSync(
      "./.env",
      `\nONBOARDING_CHANNEL="${onboardingChannelId}"`
    );

    const rulesChannelId = await prompt(
      "What ID does the rules channel have? "
    );
    fs.appendFileSync("./.env", `\nRULES_CHANNEL="${rulesChannelId}"`);

    rl.close();

    console.log("Created .env file successfully.\n\n\n");
  }

  config();

  setTimeout(() => {
    const manager = new ShardingManager("./dist/bot.js", {
      // Then we create the ShardingManager with the bot entrypoint.
      token: process.env.TOKEN, // We use the token from the environment variables.
      respawn: true, // We make sure the bot will respawn if it crashes.
    });

    function spawn() {
      // This function spawns the shards.
      manager.spawn().catch((error) => {
        // Spawn the shards. Catch errors.
        console.error("The shard failed to launch:"); // Log the error.
        console.error(
          error.stack,
          error.message,
          error.name,
          error.cause,
          error
        ); // Log the error.
        log({
          header: "Shard failed to launch",
          payload: `${error.stack}\n${error.message}\n${error.name}\n${error.cause}\n${error}`,
          type: "fatal",
        });
      });
    }
    spawn();

    manager.once("shardCreate", (shard) => {
      // This event is fired when a shard is spawned.
      shard.once("ready", async () => {
        // This event is fired when the shard is ready.
        const rl = ReadLine.createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: "",
        });
        rl.setPrompt("> ");

        rl.on("line", async (input: string) => {
          // When a line is typed.
          switch (
            input.split(" ")[0] // Switch on the first word in the line.
          ) {
            case "help": // Give info on the CLI commands.
              console.log(
                "'exit' to quit and turn off the bot",
                "\n'help' for help",
                "\n'clear' to clear the console",
                "\n'echo <text>' to echo text",
                "\n'restart' to restart the bot",
                "\n'log <header> [options]' options are --payload and --folder"
              );
              break; //

            case "clear": // Clear the console.
              console.clear();
              break;

            case "echo": // Echo the rest of the line.
              const echo = input.split(" ")[1];
              if (!echo) console.log("Nothing to echo");
              else console.log(echo);
              break;

            case "exit": // Exit the bot.
              console.log("Exit command received, shutting down...");
              log({
                header: "Shutting Down",
                type: "warn",
              });
              await manager.broadcastEval((c) => c.destroy());
              console.clear();
              process.exit();
              break;

            case "restart": // Restart the bot.
              console.log("Restart command received, restarting...");
              await manager.broadcastEval((c) => c.destroy());
              setTimeout(() => {
                spawn();
                log({
                  header: "Restarting shards",
                  type: "info",
                });
              }, 6 * 1000);
              break;

            case "log": // Log the inputs
              const logArr: string[] = input.split(" ");
              const header: string = logArr[1];
              const options: string[] = logArr.slice(2);
              let payload: string = "";
              let folder: string = "";
              // get the --payload and --folder arguments and make it able to contain multiple words.
              for (let i = 0; i < options.length; i++) {
                if (options[i] === "--payload") {
                  for (
                    let j = i + 1;
                    j < options.length && options[j] != "--folder";
                    j++
                  ) {
                    payload += options[j] + " ";
                  }
                } else if (options[i] === "--folder") {
                  for (
                    let j = i + 1;
                    j < options.length && options[j] != "--payload";
                    j++
                  ) {
                    folder += options[j] + " ";
                  }
                }
              }
              log({
                header,
                payload,
                folder,
              });
              break;

            default: // Invalid command handling.
              console.error("Invalid command");
              console.log(
                "Use 'exit' to quit and turn off the bot, or 'help' for help"
              );
              break;
          }
        });
        setTimeout(() => {
          rl.prompt();
        }, 2000);
      });
    });
  }, 2000);
})();
