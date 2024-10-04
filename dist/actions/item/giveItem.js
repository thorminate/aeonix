"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
const itemDatabaseSchema_1 = __importDefault(require("../../models/itemDatabaseSchema"));
/**
 * Gives an item to a user.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options The name of the item, the target user's ID, and the amount of item(s) to be given.
 */
exports.default = async (interaction, options) => {
    const { itemName, targetId, amount } = options;
    const targetData = await userDatabaseSchema_1.default.findOne({
        // get user data
        id: targetId,
        guild: interaction.guild.id,
    });
    if (!targetData) {
        // check if user exists
        await interaction.reply({
            content: "User not found, make sure they exist in the database.",
            ephemeral: true,
        });
    }
    const itemData = await itemDatabaseSchema_1.default.findOne({
        // get item data
        name: itemName,
    });
    if (!itemData) {
        // check if item exists
        await interaction.reply({
            content: "Item not found, make sure it exists in the database",
            ephemeral: true,
        });
    }
    const itemIndex = targetData.inventory.findIndex(
    // get index of item whose name matches the item name
    (item) => item.itemName === itemData.name);
    // check if item exists in inventory (-1 means it doesn't exist)
    if (itemIndex === -1) {
        // item doesn't exist in inventory
        targetData.inventory.push({
            // add item to inventory
            itemName: itemData.name,
            itemAmount: amount,
        });
    }
    else {
        // item exists in inventory
        targetData.inventory[itemIndex].itemAmount += amount; // add amount to existing item
    }
    itemData.users.push(targetId);
    await targetData.save();
    await itemData.save();
    await interaction.reply({
        content: `Successfully gave ${amount}x ${itemName} to <@${targetId}>.`,
        ephemeral: true,
    });
};
