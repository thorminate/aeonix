"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an environment.
 * @param interaction The interaction that triggered the action.
 * @param options The name, items and channel of the environment.
 */
exports.default = async (interaction, options) => {
    const { name, items, channel } = options;
    const createEnvironmentItems = await Promise.all(
    // await all promises
    createEnvironmentItemsPromises.map(async (itemName) => {
        // for each item
        if (itemName === "none")
            return itemName;
        const item = await itemData.findOne({ name: itemName }); // get their corresponding data
        return [item, itemName]; // return the item object into the new array
    }));
    if (!modalInteraction.guild.channels.cache.has(createEnvironmentChannel)) {
        // if channel id is not a number
        await modalInteraction.reply({
            // say so verbosely
            content: "Channel ID invalid!",
            ephemeral: true,
        });
        return;
    }
    if (await environmentData.findOne({
        name: createEnvironmentName,
    })) {
        // if environment already exists
        await modalInteraction.reply({
            // say so verbosely
            content: `Environment ${createEnvironmentName} already exists.`,
            ephemeral: true,
        });
        return;
    }
    if (!createEnvironmentItems.includes("none")) {
        // Check if all items exist
        const invalidItems = createEnvironmentItems.filter(
        // filter out valid items into new array
        (item) => !item[0]);
        if (invalidItems.length > 0) {
            // if there are invalid items
            await modalInteraction.reply({
                // say so verbosely
                content: `Item(s) ${invalidItems
                    .map((item, index) => createEnvironmentItems[index][0])
                    .join(", ")} not found, make sure they exist in the database.`,
                ephemeral: true,
            });
            return;
        }
        // give all items the environment name
        createEnvironmentItems.forEach(async (item) => {
            // for each existing item
            item[0].itemEnvironments.push(createEnvironmentName);
            item[0].save();
        });
        // create environment
        const createEnvironment = new environmentData({
            environmentName: createEnvironmentName,
            environmentItems: createEnvironmentItems.map((item) => item[1]),
            environmentChannel: createEnvironmentChannel,
        });
        await createEnvironment.save();
        await modalInteraction.reply({
            content: `Successfully created environment ${createEnvironmentName}.\nWith item(s): ${createEnvironmentItems
                .map((item) => {
                if (!item)
                    return "none";
                else
                    return item[1];
            })
                .join(", ")}. \nAnd channel: <#${createEnvironmentChannel}>`,
            ephemeral: true,
        });
    }
    else {
        // create environment
        const createEnvironment = new environmentData({
            environmentName: createEnvironmentName,
            environmentItems: [],
            environmentChannel: createEnvironmentChannel,
        });
        await createEnvironment.save();
        await modalInteraction.reply({
            content: `Successfully created environment ${createEnvironmentName}.\nWith no items. \nAnd channel: <#${createEnvironmentChannel}>`,
            ephemeral: true,
        });
    }
};
