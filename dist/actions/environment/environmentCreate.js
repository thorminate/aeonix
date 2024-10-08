"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemDatabaseSchema_1 = __importDefault(require("../../models/itemDatabaseSchema"));
const environmentDatabaseSchema_1 = __importDefault(require("../../models/environmentDatabaseSchema"));
/**
 * Create an environment.
 * @param interaction The interaction that triggered the action.
 * @param options The name, items and channel of the environment.
 */
exports.default = async (interaction, options) => {
    const { name, items, channel } = options;
    const itemsData = await Promise.all(items.map(async (itemName) => {
        // for each item
        if (itemName === "none")
            return itemName;
        const item = await itemDatabaseSchema_1.default.findOne({ name: itemName }); // get their corresponding data
        return [item, itemName]; // return the item object into the new array
    }));
    if (!interaction.guild.channels.cache.has(channel)) {
        // if channel id is not a number
        await interaction.reply({
            // say so verbosely
            content: "Channel ID invalid!",
            ephemeral: true,
        });
        return;
    }
    if (await environmentDatabaseSchema_1.default.findOne({
        name: name,
    })) {
        // if environment already exists
        await interaction.reply({
            // say so verbosely
            content: `Environment ${name} already exists.`,
            ephemeral: true,
        });
        return;
    }
    if (!itemsData.includes("none")) {
        // Check if all items exist
        const invalidItems = itemsData.filter(
        // filter out valid items into new array
        (item) => !item[0]);
        if (invalidItems.length > 0) {
            // if there are invalid items
            await interaction.reply({
                // say so verbosely
                content: `Item(s) ${invalidItems
                    .map((item, index) => itemsData[index][0])
                    .join(", ")} not found, make sure they exist in the database.`,
                ephemeral: true,
            });
            return;
        }
        // give all items the environment name
        itemsData.forEach(async (item) => {
            // for each existing item
            item[0].itemEnvironments.push(name);
            item[0].save();
        });
        // create environment
        const createEnvironment = new environmentDatabaseSchema_1.default({
            environmentName: name,
            environmentItems: itemsData.map((item) => item[1]),
            environmentChannel: channel,
        });
        await createEnvironment.save();
        await interaction.reply({
            content: `Successfully created environment ${name}.\nWith item(s): ${items
                .map((item) => {
                if (!item)
                    return "none";
                else
                    return item[1];
            })
                .join(", ")}. \nAnd channel: <#${channel}>`,
            ephemeral: true,
        });
    }
    else {
        // create environment
        const createEnvironment = new environmentDatabaseSchema_1.default({
            environmentName: name,
            environmentItems: [],
            environmentChannel: channel,
        });
        await createEnvironment.save();
        await interaction.reply({
            content: `Successfully created environment ${name}.\nWith no items. \nAnd channel: <#${channel}>`,
            ephemeral: true,
        });
    }
};
