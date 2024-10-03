import { ModalSubmitInteraction } from "discord.js";
import itemData from "../../models/itemDatabaseSchema";

export default async (
  interaction: ModalSubmitInteraction,
  itemName: string,
  itemDescription: string,
  itemActionType: "interact" | "consume" | "use"
) => {
  const item = await itemData.findOne({ name: itemName });
  if (item) {
    interaction.reply({
      content: "An item with that name already exists.",
      ephemeral: true,
    });
    return;
  }

  const newItem = new itemData({
    name: itemName,
    description: itemDescription,
    actionType: itemActionType,
  });

  await newItem.save();

  await interaction.reply({
    content: `Successfully created item ${itemName}.`,
    ephemeral: true,
  });
  setTimeout(() => {
    interaction.deleteReply();
  }, 5000);
};
