"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemDatabaseSchema_1 = __importDefault(require("../../models/itemDatabaseSchema"));
/**
 * Creates an item in the database.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options The name, description, and action type of the item.
 */
exports.default = async (interaction, options) => {
    const { itemName, itemDescription, itemActionType } = options;
    const item = await itemDatabaseSchema_1.default.findOne({ name: itemName });
    if (item) {
        interaction.reply({
            content: "An item with that name already exists.",
            ephemeral: true,
        });
        return;
    }
    const newItem = new itemDatabaseSchema_1.default({
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
