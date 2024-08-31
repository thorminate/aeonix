// when an event is triggered, it runs all files in that event's folder

const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (bot) => {
  // Finds event folders
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // Gets event files
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    // Runs files in event folders if folder's name matches event name
    bot.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(bot, arg);
      }
    });
  }
};
