const { Client, Message } = require("discord.js");
const userData = require("../../models/userDatabaseSchema");
const skillData = require("../../models/skillDatabaseSchema");

module.exports = async (bot, message) => {
  // if message was not made in a guild, author was a bot or the cooldown is active, return
  if (!message.inGuild() || message.author.bot) return;

  async function openInventory(message) {
    const userId = message.author.id;
    const user = await userData.findOne({ userId: userId });

    if (user) {
      const inventory = user.inventory || [];
      const inventoryList =
        inventory.length > 0
          ? inventory.join(", ")
          : "Your inventory is empty.";

      await message.reply(`Your inventory: ${inventoryList}`);
    } else {
      await message.reply("You are not registered in the system.");
    }
  }
  async function consumeItem(message, itemName) {
    const userId = message.author.id;
    const user = await userData.findOne({ userId: userId });

    if (user) {
      const itemIndex = user.inventory.indexOf(itemName);

      if (itemIndex > -1) {
        user.inventory.splice(itemIndex, 1); // Remove the item from the inventory
        await user.save();

        await message.reply(`You have consumed the ${itemName}.`);
      } else {
        await message.reply(`Item ${itemName} not found in your inventory.`);
      }
    } else {
      await message.reply("You are not registered in the system.");
    }
  }
  async function useSkill(message, skillName) {
    const userId = message.author.id;
    const user = await userData.findOne({ userId: userId });

    if (user) {
      const skill = user.skills.find((skill) => skill.skillName === skillName);

      if (skill) {
        // Perform the skill action here
        const skillAction = skill.skillAction;
        await message.reply(skillAction);
      } else if (skillName === undefined) {
        await message.reply({
          content: "Please specify a skill to use.",
          ephemeral: true,
        });
      }
      if (!skill) {
        await message.reply(`Skill ${skillName} not found.`);
      }
    } else {
      await message.reply("You are not registered in the system.");
    }
  }
  async function handleMessage(message) {
    const content = message.content.trim();

    const bracketContent = content.match(/\[(.*?)\]/g);

    if (bracketContent) {
      bracketTexts = bracketContent.map((x) => x.slice(1, -1));

      for (const text of bracketTexts) {
        if (text.toLowerCase().includes("inventory")) {
          await openInventory(message);
        } else if (text.toLowerCase().includes("consume")) {
          const itemName = text.split(" ")[1];
          await consumeItem(message, itemName);
        } else {
          const skillName = text.toLowerCase();
          await useSkill(message, skillName);
        }
      }
    }
  }

  handleMessage(message);
};
