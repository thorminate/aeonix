// when an event is triggered, it runs all files in that event's folder

import { Client } from "discord.js";
import path from "path";
import getAllFiles from "../utils/getAllFiles";

export default function eventHandler(bot: Client) {
  // Finds event folders
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // Gets event files
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a: string, b: string) => a.localeCompare(b));

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    // Runs files in event folders if folder's name matches event name
    bot.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(bot, arg);
      }
    });
  }
}
