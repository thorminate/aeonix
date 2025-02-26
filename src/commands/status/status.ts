// shows your status
import { Client, CommandInteraction, HTTPError } from "discord.js";
import Player from "../../models/Player";
import log from "../../utils/log";
import { config } from "dotenv";
import commandPrep from "../../utils/commandPrep";
config({
  path: "../../../.env",
});

export default {
  name: "status",
  description: "Shows your personal menu",
  //devOnly: Boolean,
  //testOnly: true,
  //permissionsRequired: [PermissionFlagsBits.Administrator],
  //botPermissions: [PermissionFlagsBits.Administrator],
  //options: [],
  //deleted: true,

  callback: async (bot: Client, interaction: CommandInteraction) => {
    try {
      await commandPrep(interaction);

      const player = await Player.load(interaction.user.username);

      if (!player) {
        await interaction.editReply({
          content:
            "Your player does not exist in the database, please head to onboarding channel.",
        });
        return;
      }
    } catch (error) {
      if (error instanceof HTTPError && error.status === 503) {
        log({
          header: "Status Error, the API did not respond in time.",
          payload: `${error}`,
          type: "Error",
        });
        return;
      }
      log({
        header: "Status Error",
        payload: `${error}`,
        type: "Error",
      });
    }
  },
};
