// This is the entrypoint for the the script.
// This essentially divides the bot into multiple shards for more efficiency.
import { ShardingManager } from "discord.js"; // First, we import the ShardingManager.
import * as ReadLine from "node:readline"; // Then we import the readline module, this is used later for the CLI.
import getAllFiles from "./utils/getAllFiles";
import path from "path";
import * as fs from "fs";

const manager = new ShardingManager("./dist/src/bot.js", {
  // Then we create the ShardingManager with the bot entrypoint.
  token: process.env.TOKEN, // We use the token from the environment variables.
  respawn: true, // We make sure the bot will respawn if it crashes.
});

manager.on("shardCreate", (shard) => {
  // This event is fired when a shard is spawned.
  shard.on("spawn", () => {
    shard.on("ready", async () => {
      // This event is fired when the shard is ready.
      console.clear(); // Clear the console.
      console.log(
        `Logged in as ${await shard.fetchClientValue("user.tag")}!`,
        `\n   System Info:`,
        `\n     Running on ${await shard.fetchClientValue(
          "guilds.cache.size"
        )} server(s)!`,
        `\n     Running with ${await shard.fetchClientValue(
          "users.cache.size"
        )} member(s)!`,
        `\n     API Latency: ${await shard.fetchClientValue("ws.ping")}ms`,
        `\n     Shards: ${await shard.fetchClientValue("shard.count")}`
      ); // Log that the the information.

      const rl = ReadLine.createInterface({
        // Create the readline interface.
        input: process.stdin, // input
        output: process.stdout, // output
      });
      rl.setPrompt("> "); // Set the prompt.
      rl.prompt(); // Give the prompt.

      rl.on("line", (input: string) => {
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
              "\n'eval <code>' to evaluate code"
            );
            break;

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
            rl.question("Are you sure? (y/n) ", (answer) => {
              if (answer.toLowerCase() === "y") {
                manager.broadcastEval((c) => c.destroy());
                setTimeout(() => {
                  console.clear();
                  process.exit();
                }, 1000);
              } else {
                console.log("Aborted.");
              }
            });
            break;

          default: // Invalid command handling.
            console.error("Invalid command");
            console.log(
              "Use 'exit' to quit and turn off the bot, or 'help' for help"
            );
            break;
        }

        rl.prompt(); // re-give the prompt.
      });
    });
  });
});

manager.spawn().catch((error) => {
  // Spawn the shards. Catch errors.
  console.error("The shard failed to launch:"); // Log the error.
  console.error(error.stack, error.message, error.name, error.cause, error); // Log the error.
});

/**
 * Gets all files in a directory and its subdirectories.
 * @param root The path of the root directory.
 * @returns An array of all files in the directory and its subdirectories.
 */
function getAllFilesGlobal(root: string): string[] {
  const allFiles: string[] = []; // Initialize an array to store all the files.

  try {
    // Get all folders in the root directory.
    const folders = getAllFiles(path.join(root), true);

    // Loop through all folders and get all files in them.
    for (const folder of folders) {
      if (folder) {
        // Check if the folder is not null or undefined.
        const filesInFolder = getAllFilesGlobal(folder);
        if (filesInFolder) {
          // Check if the files in the folder is not null or undefined.
          allFiles.push(...filesInFolder);
        }
      }
    }

    // Get all files in the root directory.
    const files = getAllFiles(path.join(root), false);

    // Loop through all files and add them to the array.
    for (const file of files) {
      if (file) {
        // Check if the file is not null or undefined.
        allFiles.push(file);
      }
    }
  } catch (error) {
    // Catch any errors and log them.
    console.error("Error while getting all files: ", error);
  }

  return allFiles;
}
/**
 * Checks if a file has been modified since the code started.
 * @param filePath The path of the file to check.
 * @returns If the file has been modified since the code started.
 */
function checkFileModified(filePath: string): boolean {
  try {
    // Get the last modified time of the file
    const modifiedTime = fs.statSync(filePath).mtimeMs;

    // Get the current time
    const currentTime = Date.now();

    // Get the time the code started
    const startTime = process.uptime() * 1000;

    // Check if the file has been modified since the code started
    return modifiedTime > currentTime - startTime;
  } catch (error) {
    // Handle any errors that occur during the check
    console.error(`Error checking if file has been modified: ${error}`);
    return false;
  }
}

setInterval(() => {
  for (const file of getAllFilesGlobal(path.join(__dirname, "..", "src"))) {
    if (checkFileModified(file)) {
      console.log("File has been modified, Restarting...");
    }
  }
}, 2.5 * 1000);
