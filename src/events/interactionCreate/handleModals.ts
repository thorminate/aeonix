import { Client, ModalSubmitInteraction } from "discord.js";
import Player from "../../models/player/Player";
import { EventParam } from "../../handlers/eventHandler";

export default async (event: EventParam) => {
  const { arg } = event;
  const modalInteraction = arg as ModalSubmitInteraction;

  if (!modalInteraction.isModalSubmit()) return;

  switch (modalInteraction.customId) {
    case "set-display-name":
      modalInteraction.client;
      const displayName =
        modalInteraction.fields.getTextInputValue("display-name");

      const player = await Player.loadOrCreate(modalInteraction.user.username);

      player.name = modalInteraction.user.username;
      player.characterName = displayName;

      await player.save();

      await modalInteraction.reply({
        content: "Display name set",
        ephemeral: true,
      });

      break;
  }
};
