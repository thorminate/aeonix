import { ModalSubmitInteraction } from "discord.js";
import StatusEffectData from "../../models/statusEffectDatabaseSchema";
import ms from "ms";

interface Options {
  name: string;
  description: string;
  duration: number;
}

export default async (
  interaction: ModalSubmitInteraction,
  options: Options
) => {
  if (
    await StatusEffectData.findOne({
      name: options.name,
    })
  ) {
    await interaction.reply({
      content:
        "Status effect already exists. Check database for more information.",
      ephemeral: true,
    });
    return;
  }

  const durationMs = parseInt(ms(options.duration));

  if (durationMs < 0 || durationMs > 86400000 || isNaN(durationMs)) {
    await interaction.reply({
      content: "Status effect duration invalid!",
      ephemeral: true,
    });
    return;
  }
  // create status effect

  const statusEffectNew = new StatusEffectData({
    statusEffectName: options.name,
    statusEffectDuration: durationMs,
    statusEffectDescription: options.description,
  });

  await statusEffectNew.save();
  await interaction.reply({
    content: `Successfully created status effect ${options.name}.`,
    ephemeral: true,
  });
};
