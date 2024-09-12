// function to get all local commands
import path from "path";
import getAllFiles from "../utils/getAllFiles";

export default async (exceptions = []) => {
  // define local commands as an array
  let localCommands = [];

  // get all command categories and store in an array
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  // loop through all command categories...
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);
    // ...and perform the following:
    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
