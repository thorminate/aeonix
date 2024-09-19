/**
 * Handles the slash commands.
 * @param {Client} bot The instantiating client.
 * @param {Interaction} interaction The interaction that ran the command.
 */
import { devs, primaryServer } from "../../../config.json";
import getLocalCommands from "../../utils/getLocalCommands";
import type {
  Client,
  CommandInteraction,
  PermissionsBitField,
} from "discord.js";

module.exports = async (
  bot: Client,
  commandInteraction: CommandInteraction
) => {
  if (!commandInteraction.isChatInputCommand()) return;
  // get already registered commands
  const localCommands = getLocalCommands();

  try {
    // check if command name is in localCommands
    const commandObject = localCommands.find(
      (cmd) => cmd.name === commandInteraction.commandName
    );

    // if commandObject does not exist, return
    if (!commandObject) return;

    // if command is devOnly and user is not an admin, return
    if (commandObject.devOnly) {
      if (
        "id" in commandInteraction.member &&
        !devs.includes(commandInteraction.member.id)
      ) {
        commandInteraction.reply({
          content: "Only administrators can run this command",
          ephemeral: true,
        });
        return;
      }
    }

    // if command is testOnly and user is not in primaryServer, return
    if (!(commandInteraction.guild.id === primaryServer)) {
      commandInteraction.reply({
        content: "Nuh uh, wrong server.",
        ephemeral: true,
      });
      return;
    }
    // if command requires permissions and user does not have aforementioned permission, return
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (
          !(commandInteraction.member.permissions as PermissionsBitField).has(
            permission as PermissionsBitField
          )
        ) {
          commandInteraction.reply({
            content: "Access Denied",
            ephemeral: true,
          });
          return;
        }
      }
    }
    // if command requires bot permissions and bot does not have aforementioned permission, return
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = commandInteraction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          commandInteraction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }
    // if all goes well, run the commands callback function.
    await commandObject.callback(bot, commandInteraction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
