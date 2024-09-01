// shows your status
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ActionRowBuilder,
} = require("discord.js");
const userData = require("../../models/userDatabaseSchema");
const calculateLevelExp = require("../../utils/calculateLevelExp");
const buttonWrapper = require("../../utils/buttonWrapper");
const statusAdminHandler = require("./statusAdminHandler");

module.exports = {
  name: "status",
  description: "Shows your personal menu",
  //devOnly: Boolean,
  testOnly: true,
  //permissionsRequired: [PermissionFlagsBits.Administrator],
  //botPermissions: [PermissionFlagsBits.Administrator],
  options: [],
  //deleted: true,
  /**
   *
   *@param {Interaction} interaction
   *@param {Client} bot
   */

  callback: async (bot, interaction) => {
    // if the command is not in a guild, say so and return
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command inside a server");
      return;
    }

    try {
      // defer reply and make it ephemeral
      await interaction.deferReply({
        ephemeral: true,
      });

      //define targetUserObj
      const targetUserId = interaction.member.id;
      const targetUserObj = await interaction.guild.members.fetch(targetUserId);

      // find user in database and then get their data
      const targetUserData = await userData.findOne({
        userId: targetUserId,
        guildId: interaction.guild.id,
      });

      // if user doesn't exist in database, say so and return
      if (!targetUserData) {
        interaction.editReply(
          "You haven't been integrated into the system yet. Head over to <#1270790941892153404>"
        );
        return;
      }

      let skillsDisplay = "";
      if (targetUserData.skills && targetUserData.skills.length > 0) {
        skillsDisplay = targetUserData.skills
          .map((skill) => {
            const skillUppercaseLetter = skill[0].toUpperCase();
            return `${skillUppercaseLetter}${skill.slice(1)}`;
          })
          .filter((skillArray) => skillArray && skillArray[0])
          .join(", ");
      } else {
        skillsDisplay = "No skills learned yet";
      }

      async function playerMenu(prevAdmin = false) {
        const inventory = new ButtonBuilder()
          .setLabel("Inventory")
          .setStyle(ButtonStyle.Primary)
          .setCustomId("inventory")
          .setDisabled(false);

        let playerReply;
        if (prevAdmin === true) {
          const backToAdmin = new ButtonBuilder()
            .setLabel("Reload as admin")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("backAsAdmin")
            .setDisabled(false);

          playerReply = await interaction.editReply({
            content: `Hello <@${targetUserObj.user.id}>!\nYour level is **${
              targetUserData.level
            }** and you have **${targetUserData.exp}/${calculateLevelExp(
              targetUserData.level + 1
            )}** experience.\n# ***Stats:***\n**Strength:** ***${
              targetUserData.strength
            }***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${
              targetUserData.cognition
            }***\n# ***Skills:***\n${skillsDisplay}`,
            ephemeral: true,
            components: buttonWrapper([inventory, backToAdmin]),
          });
        } else {
          playerReply = await interaction.editReply({
            content: `Hello <@${targetUserObj.user.id}>!\nYour level is **${
              targetUserData.level
            }** and you have **${targetUserData.exp}/${calculateLevelExp(
              targetUserData.level + 1
            )}** experience.\n# ***Stats:***\n**Strength:** ***${
              targetUserData.strength
            }***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${
              targetUserData.cognition
            }***\n# ***Skills:***\n${skillsDisplay}`,
            ephemeral: true,
            components: buttonWrapper([inventory]),
          });
        }

        // make sure the user who ran the command is the one who clicked the button
        const filter = (i) => i.user.id === interaction.user.id;

        // collect button clicks
        const collector = playerReply.createMessageComponentCollector({
          componentType: ComponentType.Button,
          filter,
        });

        collector.on("collect", async (i) => {
          if (i.customId === "inventory") {
            const formattedInventory =
              targetUserData.inventory.map((item) => `${item}`).join(",\n") ||
              "is empty...";
            await i.reply({
              content: `## Your inventory\n ${formattedInventory}`,
              ephemeral: true,
            });
          } else if (i.customId === "backAsAdmin") {
            await adminMenu();
          }
        });
      }

      async function adminMenu() {
        // set up admin button collection
        const playerModification = new ButtonBuilder()
          .setLabel("Modify Player Data")
          .setStyle(ButtonStyle.Primary)
          .setCustomId("player-modification")
          .setDisabled(false);

        const moderation = new ButtonBuilder()
          .setLabel("Moderation")
          .setStyle(ButtonStyle.Primary)
          .setCustomId("moderation")
          .setDisabled(false);

        const playerMode = new ButtonBuilder()
          .setLabel("Reload as Player")
          .setStyle(ButtonStyle.Primary)
          .setCustomId("player-mode")
          .setDisabled(false);

        // send welcome message to admin

        const adminReply = await interaction.editReply({
          content: `Welcome Administrator <@${
            targetUserObj.user.id
          }>!\nYour level is **${targetUserData.level}** and you have **${
            targetUserData.exp
          }/${calculateLevelExp(
            targetUserData.level + 1
          )}** experience.\n# ***Stats:***\n**Strength:** ***${
            targetUserData.strength
          }***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${
            targetUserData.cognition
          }***\n# ***Skills:***\n${skillsDisplay}\n\n-# What action would you like to perform?`,
          components: buttonWrapper([
            playerModification,
            moderation,
            playerMode,
          ]),
        });

        // make sure the user who ran the command is the one who clicked the button
        const filter = (i) => i.user.id === interaction.user.id;

        // collect button clicks
        const collector = adminReply.createMessageComponentCollector({
          componentType: ComponentType.Button,
          filter,
        });

        // handle button clicks
        if (collector.pending) {
          console.log("Collector has pending interactions, returning");
          return;
        }
        collector.on("collect", async (buttonInteraction) => {
          if (buttonInteraction.customId === "player-modification") {
            // Handle "Modify Player Data" button click
            const updatedComponents = adminReply.components.map((row) => {
              return ActionRowBuilder.from(row).setComponents(
                row.components.map((button) => {
                  return button;
                })
              );
            });

            // Edit the original reply to disable the button
            await interaction.editReply({
              content: `loading...`,
              components: updatedComponents,
            });
            // Define buttons for submenu

            const modifyStatsButton = new ButtonBuilder()
              .setLabel("Modify Stats")
              .setStyle(ButtonStyle.Secondary)
              .setCustomId("modify_stats")
              .setDisabled(false);

            const createSkillButton = new ButtonBuilder()
              .setLabel("Create Skill")
              .setStyle(ButtonStyle.Secondary)
              .setCustomId("create_skill")
              .setDisabled(false);

            const deleteSkillButton = new ButtonBuilder()
              .setLabel("Delete Skill")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("delete_skill")
              .setDisabled(false);

            const grantSkillButton = new ButtonBuilder()
              .setLabel("Grant Skill")
              .setStyle(ButtonStyle.Secondary)
              .setCustomId("grant_skill")
              .setDisabled(false);

            const revokeSkillButton = new ButtonBuilder()
              .setLabel("Revoke Skill")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("revoke_skill")
              .setDisabled(false);

            await buttonInteraction.update({
              content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(
                0,
                1
              )}?`,
              components: buttonWrapper([
                modifyStatsButton,
                createSkillButton,
                grantSkillButton,
                deleteSkillButton,
                revokeSkillButton,
              ]),
            });
          } else if (buttonInteraction.customId === "modify_stats") {
            // Handle "Modify Stats" button click
            await statusAdminHandler.handleStatsGiverModal(buttonInteraction);
          } else if (buttonInteraction.customId === "create_skill") {
            // Handle "Create Skill" button click
            await statusAdminHandler.handleCreateSkillModal(buttonInteraction);
          } else if (buttonInteraction.customId === "delete_skill") {
            // Handle "Delete Skill" button click
            await statusAdminHandler.handleDeleteSkillModal(buttonInteraction);
          } else if (buttonInteraction.customId === "grant_skill") {
            // Handle "Grant Skill" button click
            await statusAdminHandler.handleGrantSkillModal(buttonInteraction);
          } else if (buttonInteraction.customId === "revoke_skill") {
            // Handle "Revoke Skill" button click
            await statusAdminHandler.handleRevokeSkillModal(buttonInteraction);
          } else if (buttonInteraction.customId === "moderation") {
            // Handle "Moderation" button click
            const updatedComponents = adminReply.components.map((row) => {
              return ActionRowBuilder.from(row).setComponents(
                row.components.map((button) => {
                  return button;
                })
              );
            });

            // Edit the original reply to disable the button
            await interaction.editReply({
              content: `loading...`,
              components: updatedComponents,
            });
            // Define buttons for submenu

            const banUserButton = new ButtonBuilder()
              .setLabel("Ban User")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("ban_user")
              .setDisabled(false);

            const kickUserButton = new ButtonBuilder()
              .setLabel("Kick User")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("kick_user")
              .setDisabled(false);

            const timeoutUserButton = new ButtonBuilder()
              .setLabel("Timeout User")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("timeout_user")
              .setDisabled(false);

            await buttonInteraction.update({
              content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(
                0,
                1
              )}?`,
              components: buttonWrapper([
                banUserButton,
                kickUserButton,
                timeoutUserButton,
              ]),
            });
          } else if (buttonInteraction.customId === "ban_user") {
            // Handle "Ban User" button click
            await statusAdminHandler.handleBanUserModal(buttonInteraction);
          } else if (buttonInteraction.customId === "kick_user") {
            // Handle "Kick User" button click
            await statusAdminHandler.handleKickUserModal(buttonInteraction);
          } else if (buttonInteraction.customId === "timeout_user") {
            // Handle "Timeout User" button click
            await statusAdminHandler.handleTimeoutUserModal(buttonInteraction);
          } else if (buttonInteraction.customId === "player-mode") {
            //reload as a player
            await playerMenu(true);
          }
        });
      }
      if (
        interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        adminMenu();
      } else {
        playerMenu();
      }
    } catch (error) {
      console.log(`There was an error running status: ${error}`);
    }
  },
};
