import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import buttonWrapper from "../../utils/buttonWrapper";

export default async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return;

  const modal = new ModalBuilder()
    .setTitle("Set your some data")
    .setCustomId("set-display-name")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("display-name")
          .setLabel("Display name/Character Name")
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(32)
          .setMinLength(2)
      )
    );
};
