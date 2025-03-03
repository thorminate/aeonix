import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
} from "discord.js";
import Player from "../../models/player/Player";
import buttonWrapper from "../../utils/buttonWrapper";
import { EventParam } from "../../handlers/eventHandler";

export default async (event: EventParam) => {
  const { arg } = event;
  const buttonInteraction = arg as ButtonInteraction;

  if (!buttonInteraction.isButton()) return;

  switch (buttonInteraction.customId) {
    case "onboarding-start":
      break;
    case "delete-player":
      if (!Player.load(buttonInteraction.user.username)) {
        await buttonInteraction.reply({ content: "You don't exist in the DB" });
        return;
      }

      const buttons = buttonWrapper([
        new ButtonBuilder()
          .setCustomId("delete-player-confirmed")
          .setLabel("Yes")
          .setStyle(ButtonStyle.Danger),
      ]);

      await buttonInteraction.editReply({
        content: "Are you sure you want to delete your persona?",
        components: buttons,
      });

      break;
    case "delete-player-confirmed":
      await Player.delete(buttonInteraction.user.username);
      await buttonInteraction.editReply({
        content: "Your persona has been deleted.",
      });
  }
};
