import { ModalSubmitInteraction } from "discord.js";
import ItemData from "../../models/itemDatabaseSchema";
import EnvironmentData from "../../models/environmentDatabaseSchema";

interface Options {
  name: string;
  items: string[];
  channel: string;
}

/**
 * Create an environment.
 * @param interaction The interaction that triggered the action.
 * @param options The name, items and channel of the environment.
 */
export default async (
  interaction: ModalSubmitInteraction,
  options: Options
) => {
  const { name, items, channel } = options;

  const itemsData = await Promise.all(items.map(async (itemName: string) => {
    // for each item
    if (itemName === "none") return itemName;
    const item: Document = await ItemData.findOne({ name: itemName }); // get their corresponding data
    return [item, itemName]; // return the item object into the new array
  }))

  if (!interaction.guild.channels.cache.has(channel)) {
    // if channel id is not a number
    await interaction.reply({
      // say so verbosely
      content: "Channel ID invalid!",
      ephemeral: true,
    });
    return;
  }
  if (
    await EnvironmentData.findOne({
      name: name,
    })
  ) {
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
    const invalidItems = createEnvironmentItems.filter(
      // filter out valid items into new array
      (item) => !item[0]
    );
    if (invalidItems.length > 0) {
      // if there are invalid items
      await modalInteraction.reply({
        // say so verbosely
        content: `Item(s) ${invalidItems
          .map((item: null, index: number) => createEnvironmentItems[index][0])
          .join(", ")} not found, make sure they exist in the database.`,
        ephemeral: true,
      });
      return;
    }
    // give all items the environment name
    createEnvironmentItems.forEach(async (item: any) => {
      // for each existing item
      item[0].itemEnvironments.push(createEnvironmentName);
      item[0].save();
    });
    // create environment
    const createEnvironment = new environmentData({
      environmentName: createEnvironmentName,
      environmentItems: createEnvironmentItems.map(
        (item: Array<Document | string>) => item[1]
      ),
      environmentChannel: createEnvironmentChannel,
    });
    await createEnvironment.save();
    await modalInteraction.reply({
      content: `Successfully created environment ${createEnvironmentName}.\nWith item(s): ${createEnvironmentItems
        .map((item: any) => {
          if (!item) return "none";
          else return item[1];
        })
        .join(", ")}. \nAnd channel: <#${createEnvironmentChannel}>`,
      ephemeral: true,
    });
  } else {
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
