// Register, edit and delete commands
const config = require("../../../config.json");
const { primaryServer } = config;
import areCommandsDifferent from "../../utils/areCommandsDifferent";
import getApplicationCommands from "../../utils/getApplicationCommands";
import getLocalCommands from "../../utils/getLocalCommands";

export default async function registerCommands(bot) {
  try {
    // Define local commands and application commands
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      bot,
      primaryServer
    );

    // loop through all local commands
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      if (!name) {
        continue;
      }

      // check if command already exists and store in a variable
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      // if command exists, check if it's set to be deleted
      if (existingCommand) {
        if (localCommand.deleted) {
          // if it's set to be deleted, then delete it
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command "${name}".`);
          continue;
        }
        // if commands are different, then update it.
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          // log edited command
          console.log(`Edited command "${name}".`);
        }
      } else {
        // if command is set to be deleted, then skip registering it.
        if (localCommand.deleted) {
          console.log(
            `Skipping to register command "${name}" as its set to delete.`
          );
          continue;
        }
        // register command
        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`Registered command "${name}".`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
}
