import { Interaction, CommandInteraction } from "discord.js";

export default function commandVerify(
  interaction: CommandInteraction | Interaction
) {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild()) {
    (interaction as CommandInteraction).reply(
      "This command can only be used in a server"
    );
    return false;
  }
  return true;
}
