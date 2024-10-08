"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemDatabaseSchema_1 = __importDefault(require("../../models/itemDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * Revokes an item from a user.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options The name of the item to be revoked and the target user's ID.
 * @returns {Promise<void>}
 */
exports.default = async (interaction, options) => {
    const { itemName, targetId } = options;
    const itemData = await itemDatabaseSchema_1.default.findOne({
        name: itemName,
    });
    if (!itemData) {
        await interaction.reply({
            content: "Item not found, make sure it exist in the database",
            ephemeral: true,
        });
        return;
    }
    const targetData = await userDatabaseSchema_1.default.findOne({
        id: targetId,
        guild: interaction.guild.id,
    });
    if (!targetData) {
        await interaction.reply({
            content: "User not found, make sure they are in the server.",
            ephemeral: true,
        });
        return;
    }
    if (targetData.inventory.some((item) => item.itemName === itemName)) {
        targetData.inventory = targetData.inventory.filter((item) => item.itemName !== itemName);
        itemData.users = itemData.users.filter((user) => user !== targetId);
        await targetData.save();
        await itemData.save();
        await interaction.reply({
            content: `Successfully removed item ${itemName[0].toUpperCase() + itemName.slice(1)} from <@${targetId}>'s inventory.`,
            ephemeral: true,
        });
    }
    else {
        await interaction.reply({
            content: "User does not have the item in their inventory.",
            ephemeral: true,
        });
        return;
    }
};