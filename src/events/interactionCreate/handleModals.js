const { ButtonBuilder, ButtonStyle } = require("discord.js");
const buttonWrapper = require("../../utils/buttonWrapper");
const userData = require("../../models/userDatabaseSchema");
const skillData = require("../../models/skillDatabaseSchema");
const itemData = require("../../models/itemDatabaseSchema");
const ms = require("ms");

module.exports = async (bot, modalInteraction) => {
  try {
    if (!modalInteraction.isModalSubmit()) return;

    if (modalInteraction.customId === "stats-giver-modal") {
      // Get the input values
      const statAmount = parseInt(
        modalInteraction.fields.getTextInputValue("stats-giver-input")
      );
      const statsTargetUserInput = modalInteraction.fields.getTextInputValue(
        "stats-giver-target-input"
      );

      const variant = modalInteraction.fields.getTextInputValue(
        "stats-giver-variant-input"
      );

      const modifier = modalInteraction.fields.getTextInputValue(
        "stats-giver-modifier-input"
      );

      // Validate the inputs
      if (
        isNaN(statAmount) ||
        statAmount < 0 ||
        !modalInteraction.guild.members.cache.has(statsTargetUserInput)
      ) {
        await modalInteraction.reply({
          content:
            "Please enter a valid positive number for the stat amount and a valid user ID.",
          ephemeral: true,
        });
        return;
      }

      if (
        variant !== "strength" &&
        variant !== "will" &&
        variant !== "cognition" &&
        variant !== "level" &&
        variant !== "exp"
      ) {
        await modalInteraction.reply({
          content:
            "Please enter a valid variant. Valid variants are 'strength', 'will', 'cognition', 'level', and 'exp'.",
          ephemeral: true,
        });
        return;
      }

      if (modifier !== "add" && modifier !== "remove" && modifier !== "set") {
        await modalInteraction.reply({
          content:
            "Please enter a valid modifier. Valid modifiers are 'add', 'remove', and 'set'.",
          ephemeral: true,
        });
        return;
      }

      // Fetch the target user and update their stats
      const statsTargetUserObj = await modalInteraction.guild.members.fetch(
        statsTargetUserInput
      );

      const statsTargetUserData = await userData.findOne({
        userId: statsTargetUserObj.user.id,
        guildId: modalInteraction.guild.id,
      });

      if (!statsTargetUserData) {
        await modalInteraction.reply({
          content:
            "User not found in the database. Please make sure the user has at least sent one message before running this command.",
          ephemeral: true,
        });
        return;
      }

      if (modifier === "add") {
        if (variant === "strength") {
          statsTargetUserData.strength =
            statsTargetUserData.strength + statAmount;
        } else if (variant === "will") {
          statsTargetUserData.will = statsTargetUserData.will + statAmount;
        } else if (variant === "cognition") {
          statsTargetUserData.cognition =
            statsTargetUserData.cognition + statAmount;
        } else if (variant === "level") {
          statsTargetUserData.level = statsTargetUserData.level + statAmount;
        } else if (variant === "exp") {
          statsTargetUserData.exp = statsTargetUserData.exp + statAmount;
        }
        await statsTargetUserData.save();

        await modalInteraction.reply({
          content: `Successfully gave <@${statsTargetUserObj.user.id}> **${statAmount}** stat point(s) to the ${variant} variant!`,
          ephemeral: true,
        });
      }
      if (modifier === "remove") {
        if (variant === "strength") {
          statsTargetUserData.strength =
            statsTargetUserData.strength - statAmount;
        } else if (variant === "will") {
          statsTargetUserData.will = statsTargetUserData.will - statAmount;
        } else if (variant === "cognition") {
          statsTargetUserData.cognition =
            statsTargetUserData.cognition - statAmount;
        } else if (variant === "level") {
          statsTargetUserData.level = statsTargetUserData.level - statAmount;
        } else if (variant === "exp") {
          statsTargetUserData.exp = statsTargetUserData.exp - statAmount;
        }
        if (statsTargetUserData.strength < 0) {
          statsTargetUserData.strength = 0;
        }
        if (statsTargetUserData.will < 0) {
          statsTargetUserData.will = 0;
        }
        if (statsTargetUserData.cognition < 0) {
          statsTargetUserData.cognition = 0;
        }
        await statsTargetUserData.save();

        await modalInteraction.reply({
          content: `Successfully took <@${statsTargetUserObj.user.id}> **${statAmount}** stat point(s) from ${variant}!`,
          ephemeral: true,
        });
      }
      if (modifier === "set") {
        if (variant === "strength") {
          statsTargetUserData.strength = statAmount;
        } else if (variant === "will") {
          statsTargetUserData.will = statAmount;
        } else if (variant === "cognition") {
          statsTargetUserData.cognition = statAmount;
        } else if (variant === "level") {
          statsTargetUserData.level = statAmount;
        } else if (variant === "exp") {
          statsTargetUserData.exp = statAmount;
        }
        await statsTargetUserData.save();

        await modalInteraction.reply({
          content: `Successfully set <@${statsTargetUserObj.user.id}>'s ${variant} to **${statAmount}!**`,
          ephemeral: true,
        });
      }
    } else if (modalInteraction.customId === "create-skill-modal") {
      // get input values
      const createSkillName = modalInteraction.fields
        .getTextInputValue("create-skill-name-input")
        .toLowerCase();
      const createSkillDescription = modalInteraction.fields.getTextInputValue(
        "create-skill-description-input"
      );
      const createSkillAction = modalInteraction.fields.getTextInputValue(
        "create-skill-action-input"
      );
      const createSkillCooldown = parseInt(
        modalInteraction.fields.getTextInputValue("create-skill-cooldown-input")
      );
      const createSkillWill = parseInt(
        modalInteraction.fields.getTextInputValue("create-skill-will-input")
      );

      // Validate the inputs
      if (
        createSkillName === "" ||
        createSkillDescription === "" ||
        createSkillAction === "" ||
        isNaN(createSkillCooldown) ||
        isNaN(createSkillWill)
      ) {
        await modalInteraction.reply({
          content:
            "Please fill in all the required fields correctly. Cooldown and Will must be numbers.",
          ephemeral: true,
        });
        return;
      }
      // check if skill already exists
      if (await skillData.findOne({ skillName: createSkillName })) {
        await modalInteraction.reply({
          content: "Skill already exists. Please choose a different name.",
          ephemeral: true,
        });
        return;
      }

      // create a new skill and store it in the database

      const newSkill = new skillData({
        skillName: createSkillName,
        skillDescription: createSkillDescription,
        skillAction: createSkillAction,
        skillCooldown: createSkillCooldown,
        skillWill: createSkillWill,
      });

      await newSkill.save();

      await modalInteraction.reply({
        content: `Successfully created skill ${createSkillName}.`,
        ephemeral: true,
      });
    } else if (modalInteraction.customId === "delete-skill-modal") {
      // get input values
      const deleteSkillName = modalInteraction.fields
        .getTextInputValue("delete-skill-name-input")
        .toLowerCase();

      // Validate the inputs
      if (deleteSkillName === "") {
        await modalInteraction.reply({
          content: "Please fill in the required field.",
          ephemeral: true,
        });
        return;
      }
      // first delete the skill from all users that have it
      const skillUsers = await userData.find({
        skills: { $elemMatch: { skillName: deleteSkillName } },
      });

      for (const skillUser of skillUsers) {
        skillUser.skills = skillUser.skills.filter(
          (skill) => skill.skillName !== deleteSkillName
        );

        if (skillUser.skills.length === 0) {
          skillUser.skills = [];
        }

        await skillUser.save();
      }

      // delete the skill from the database
      const deletedSkill = await skillData.deleteOne({
        skillName: deleteSkillName,
      });

      if (deletedSkill.deletedCount === 0) {
        await modalInteraction.reply({
          content: `Failed to delete skill ${deleteSkillName}. Please check if the skill exists.`,
          ephemeral: true,
        });
      } else {
        await modalInteraction.reply({
          content: `Successfully deleted skill ${deleteSkillName}.`,
          ephemeral: true,
        });
      }
    } else if (modalInteraction.customId === "grant-skill-modal") {
      // get input values
      const grantSkillName = modalInteraction.fields
        .getTextInputValue("grant-skill-name-input")
        .toLowerCase();
      const grantSkillTarget = modalInteraction.fields.getTextInputValue(
        "grant-skill-target-input"
      );

      // Validate the inputs
      if (grantSkillName === "") {
        await modalInteraction.reply({
          content: "Please fill in the required fields.",
          ephemeral: true,
        });
        return;
      }

      // grant the skill to the target user
      const grantSkillTargetUserData = await userData.findOne({
        userId: grantSkillTarget,
      });

      if (!grantSkillTargetUserData) {
        await modalInteraction.reply({
          content:
            "Target user not found. Make sure you entered a valid user ID.",
          ephemeral: true,
        });
        return;
      }

      const grantSkillSkill = await skillData.findOne({
        skillName: grantSkillName,
      });

      if (!grantSkillSkill) {
        await modalInteraction.reply({
          content: `Skill ${grantSkillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
          ephemeral: true,
        });
        return;
      }

      // check if the user already has the skill
      if (
        grantSkillTargetUserData.skills.some(
          (skill) => skill === grantSkillName
        )
      ) {
        await modalInteraction.reply({
          content: `User already has skill ${grantSkillName}.`,
          ephemeral: true,
        });
        return;
      }

      grantSkillSkill.skillUsers.push(grantSkillTargetUserData.userId);
      await grantSkillSkill.save();
      grantSkillTargetUserData.skills.push(grantSkillSkill.skillName);
      await grantSkillTargetUserData.save();

      await modalInteraction.reply({
        content: `Successfully granted skill ${grantSkillName} to <@${grantSkillTarget}>.`,
        ephemeral: true,
      });
    } else if (modalInteraction.customId === "revoke-skill-modal") {
      // get input values
      const revokeSkillName = modalInteraction.fields
        .getTextInputValue("revoke-skill-name-input")
        .toLowerCase();
      const revokeSkillTarget = modalInteraction.fields.getTextInputValue(
        "revoke-skill-target-input"
      );

      // Validate the inputs
      const revokeSkillData = await skillData.findOne({
        skillName: revokeSkillName,
      });

      if (!revokeSkillData) {
        await modalInteraction.reply({
          content: `Skill ${revokeSkillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
          ephemeral: true,
        });
        return;
      }

      const revokeSkillTargetData = await userData.findOne({
        userId: revokeSkillTarget,
        guildId: modalInteraction.guild.id,
      });

      if (!revokeSkillTargetData) {
        await modalInteraction.reply({
          content:
            "Target user not found. Make sure you entered a valid user ID.",
          ephemeral: true,
        });
        return;
      }

      // check if the user has the skill
      if (revokeSkillTargetData.skills.includes(revokeSkillName)) {
        revokeSkillTargetData.skills = revokeSkillTargetData.skills.filter(
          (skill) => skill !== revokeSkillName
        );
        await revokeSkillTargetData.save();
        await modalInteraction.reply({
          content: `Successfully revoked skill ${revokeSkillName} from <@${revokeSkillTarget}>.`,
          ephemeral: true,
        });
      } else {
        await modalInteraction.reply({
          content: `User does not have skill ${revokeSkillName}.`,
          ephemeral: true,
        });
      }
    } else if (modalInteraction.customId === "create-item-modal") {
      // get input values
      const itemName = modalInteraction.fields.getTextInputValue(
        "create-item-name-input"
      ).toLowerCase();
      const itemDescription = modalInteraction.fields.getTextInputValue(
        "create-item-description-input"
      );
      const itemActionable = modalInteraction.fields
        .getTextInputValue("create-item-actionable-input")
        .toLowerCase();
      const itemAction = modalInteraction.fields.getTextInputValue(
        "create-item-action-input"
      );

      function checkItemActionSyntax(actionString) {
        if (actionString === "none") return true;
        const actionParts = actionString.split(",");
        const validOperators = ["+", "-"];
        const validStats = ["STRENGTH", "WILL", "COGNITION"];

        for (const action of actionParts) {
          const [stat, operator, value] = action.trim().split(" ");
          if (!validStats.includes(stat)) {
            return false; // invalid stat
          }
          if (!validOperators.includes(operator)) {
            return false; // invalid operator
          }
          if (isNaN(parseInt(value))) {
            return false; // invalid value
          }
        }
        return true; // syntax is correct
      }

      /*
      
      // the code to execute the item action using correct syntax

      function executeItemAction(actionString, userData) {
        if (actionString === "none") return;
        const actionParts = actionString.split(",");
        const operators = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
        };

        for (const action of actionParts) {
          const [stat, operator, value] = action.trim().split(" ");
          const statName = stat.toLowerCase();
          const statValue = parseInt(value);
          userData[statName] = operators[operator](
            userData[statName],
            statValue
          );
        }
      }
      */
      // Validate the inputs
      if (
        !itemActionable === "interact" ||
        !itemActionable === "consume" ||
        !itemActionable === "use"
      ) {
        modalInteraction.reply({
          content:
            "The third field must be either 'interactable', 'consumable' or 'usable'.",
          ephemeral: true,
        });
        return;
      }

      if (checkItemActionSyntax(itemAction) === false) {
        modalInteraction.reply({
          content:
            "The fourth field must be a valid action syntax.\nExample: COGNITION + 10, WILL - 5\nThey must be separated by a comma and a space. The operator must be either '+' or '-'. The stat must be either 'STRENGTH', 'WILL' or 'COGNITION'. The value must be a number. Each action must be separated by a space. so COGNITION+10, WILL-5 in invalid syntax.",
          ephemeral: true,
        });
        return;
      }

      const existingItem = await itemData.findOne({
        itemName: itemName,
      });
      if (existingItem) {
        modalInteraction.reply({
          content:
            "An item with that name already exists. You can skip this step.",
          ephemeral: true,
        });
        return;
      }

      const newItem = new itemData({
        itemName: itemName,
        itemDescription: itemDescription,
        itemActionable: itemActionable,
        itemAction: itemAction,
      });

      await newItem.save();

      await modalInteraction.reply({
        content: `Successfully created item ${itemName}.`,
        ephemeral: true,
      });
    } else if (modalInteraction.customId === "give-item-modal") {
      // get input values

      const giveItemName = modalInteraction.fields.getTextInputValue(
        "give-item-name-input"
      ).toLowerCase();

      const giveItemTarget = modalInteraction.fields.getTextInputValue(
        "give-item-target-input"
      );

      const giveItemTargetData = userData.findOne({
        userId: giveItemTarget,
        guildId: modalInteraction.guild.id,
      })

      if (!giveItemTargetData) {
        await modalInteraction.reply({
          content: "User not found, make sure they exist in the database.",
          ephemeral: true,
        })
      }

      const giveItemData = itemData.findOne({
        itemName: giveItemName
      })

      if (!giveItemData) {
        await modalInteraction.reply({
          content: "Item not found, make sure it exist in the database",
          ephemeral: true,
        })
      }

      if (giveItemTargetData.inventory.includes(giveItemData.itemName)) {
        //giveItemTargetData.inventory.
      } else {
        //giveItemTargetData.inventory.push(giveItemData.itemName)
      }
    } else if (modalInteraction.customId === "ban-user-modal") {
      // get input values
      const banUserId = modalInteraction.fields.getTextInputValue(
        "ban-user-target-input"
      );
      const banUserReason = modalInteraction.fields.getTextInputValue(
        "ban-user-reason-input"
      );

      // Validate the inputs
      if (banUserId === "") {
        await modalInteraction.reply({
          content: "Please fill in the required fields.",
          ephemeral: true,
        });
        return;
      }

      const buttonConfirm = new ButtonBuilder()
        .setCustomId("ban-user-confirm")
        .setLabel("Confirm")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(false);

      const buttonCancel = new ButtonBuilder()
        .setCustomId("ban-user-cancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Success)
        .setDisabled(false);

      await modalInteraction.reply({
        content: "Are you sure you want to ban this user?",
        ephemeral: true,
        components: buttonWrapper([buttonConfirm, buttonCancel]),
      });

      const collector =
        modalInteraction.channel.createMessageComponentCollector({
          filter: (m) => m.user.id === modalInteraction.user.id,
          max: 1,
        });

      collector.on("collect", async (i) => {
        if (i.customId === "ban-user-confirm") {
        }
      });
    } else if (modalInteraction.customId === "kick-user-modal") {
      // get input values
      const kickUserId = modalInteraction.fields.getTextInputValue(
        "kick-user-target-input"
      );
      const kickUserReason =
        modalInteraction.fields.getTextInputValue("kick-user-reason-input") ||
        "No reason provided";

      // get the target user object
      const kickUser = await modalInteraction.guild.members
        .fetch(kickUserId)
        ?.catch(() => null);

      // check if the target user exists, else edit the reply and return
      if (!kickUser) {
        await modalInteraction.reply({
          content: "That user doesn't exist in this server.",
          ephemeral: true,
        });
        return;
      }

      // check if the target user is a bot
      if (kickUser.user.bot) {
        await modalInteraction.reply({
          content: "You cannot kick a bot.",
          ephemeral: true,
        });
        return;
      }

      // check if the target user is the owner of the server
      if (kickUser.id === modalInteraction.guild.ownerId) {
        await modalInteraction.reply({
          content: "I cannot kick my creator.",
          ephemeral: true,
        });
        return;
      }
      // define the target user role position and request user role position
      const kickUserRolePosition = kickUser.roles.highest.position;
      const kickUserRequesterRolePosition =
        modalInteraction.member.roles.highest.position;
      const kickUserBotRolePosition =
        modalInteraction.guild.members.me.roles.highest.position;

      // check if the target user is of a higher position than the request user
      if (kickUserRolePosition >= kickUserRequesterRolePosition) {
        await modalInteraction.reply({
          content:
            "That user is of a higher position of the power hierarchy than you. Therefore you cannot kick them.",
          ephemeral: true,
        });
        return;
      }

      // check if the target user is of a higher position than the bot
      if (kickUserRolePosition >= kickUserBotRolePosition) {
        await modalInteraction.reply({
          content:
            "That user is of a higher position of the power hierarchy than me. Therefore i cannot kick them.",
          ephemeral: true,
        });
        return;
      }
      // kick the user
      try {
        await kickUser.kick(kickUserReason);
        await modalInteraction.reply({
          content: `The user <@${kickUser.user.id}> has been kicked successfully.\n${kickUserReason}`,
          ephemeral: true,
        });
      } catch (error) {
        console.error("Error kicking user: ", error);
      }
    } else if (modalInteraction.customId === "timeout-user-modal") {
      // get input values
      const timeoutUserId = modalInteraction.fields.getTextInputValue(
        "timeout-user-target-input"
      );
      let timeoutUserDuration = modalInteraction.fields.getTextInputValue(
        "timeout-user-duration-input"
      );
      const timeoutUserReason =
        modalInteraction.fields.getTextInputValue(
          "timeout-user-reason-input"
        ) || "No reason provided";

      // get the target user object
      const timeoutUser = await modalInteraction.guild.members
        .fetch(timeoutUserId)
        ?.catch(() => null);

      // check if the target user exists, else edit the reply and return
      if (!timeoutUser) {
        await modalInteraction.reply({
          content: `That user doesn't exist in this server.\n${timeoutUserReason}`,
          ephemeral: true,
        });
        return;
      }

      // check if the target user is a bot
      if (timeoutUser.user.bot) {
        await modalInteraction.reply({
          content: "You cannot timeout a bot.",
          ephemeral: true,
        });
        return;
      }

      // check if the target user is the owner of the server
      if (timeoutUser.id === modalInteraction.guild.ownerId) {
        await modalInteraction.reply({
          content: "I cannot timeout my creator.",
          ephemeral: true,
        });
        return;
      }

      //get duration in ms
      timeoutUserDuration = ms(timeoutUserDuration);

      //check if duration is valid
      if (isNaN(timeoutUserDuration)) {
        await modalInteraction.reply({
          content: "Invalid duration. Please enter a valid duration.",
          ephemeral: true,
        });
        return;
      }

      //check if the duration is below 5 seconds or above 28 days
      if (
        timeoutUserDuration < 5000 ||
        timeoutUserDuration > 28 * 24 * 60 * 60 * 1000
      ) {
        await modalInteraction.reply({
          content:
            "Invalid duration. Please enter a duration between 5 seconds and 28 days.",
          ephemeral: true,
        });
        return;
      }

      // define role positions
      const timeoutUserRolePosition = timeoutUser.roles.highest.position;
      const timeoutUserRequesterRolePosition =
        modalInteraction.member.roles.highest.position;
      const timeoutUserBotRolePosition =
        modalInteraction.guild.members.me.roles.highest.position;

      // check if the target user is of a higher position than the request user
      if (timeoutUserRolePosition >= timeoutUserRequesterRolePosition) {
        await modalInteraction.reply({
          content:
            "That user is of a higher position of the power hierarchy than you. Therefore you cannot timeout them.",
          ephemeral: true,
        });
        return;
      }

      // check if the target user is of a higher position than the bot
      if (timeoutUserRolePosition >= timeoutUserBotRolePosition) {
        await modalInteraction.reply({
          content:
            "That user is of a higher position of the power hierarchy than me. Therefore i cannot timeout them.",
          ephemeral: true,
        });
        return;
      }

      // timeout the user
      try {
        await timeoutUser.timeout(timeoutUserDuration, timeoutUserReason);
        await modalInteraction.reply({
          content: `The user <@${timeoutUser.user.id}> has been timed out successfully.\n${timeoutUserReason}`,
          ephemeral: true,
        });
      } catch (error) {
        console.error("Error timing out user: ", error);
      }
    }
  } catch (error) {
    console.error("Error handling modal submission:", error);
  }
};
