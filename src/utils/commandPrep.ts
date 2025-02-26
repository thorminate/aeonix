import { CommandInteraction } from "discord.js";

interface Options {
  ephemeral: boolean;
}

export default async (interaction: CommandInteraction, Options?: Options) => {
  if (!Options) {
    Options = {
      ephemeral: true,
    };
  }

  const { ephemeral } = Options;

  if (!interaction.isChatInputCommand() || !interaction.inGuild()) {
    await interaction.reply({
      content: "Invalid command.",
      ephemeral,
    });
    return;
  }

  await interaction.deferReply({
    ephemeral,
  });
};
