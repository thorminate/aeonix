/**
 * Handles the modals.
 * @param {Client} bot The instantiating client.
 * @param {Interaction} modalInteraction The interaction that ran the command.
 */
import {
  ModalSubmitInteraction,
  Client,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from "discord.js";
import UserData from "../../models/UserData";
import actions from "../../actions/actionIndex";
import path from "path";
import log from "../../utils/log";
import {
  ChannelNotFoundError,
  EnvironmentCreationError,
  SkillAlreadyExistsError,
} from "../../errors";

export default async (
  bot: Client,
  modalInteraction: ModalSubmitInteraction
) => {
  // Export the function
  if (!modalInteraction.isModalSubmit()) return;
  try {
    switch (
      modalInteraction.customId // Switch on the (pretty self-explanatory) custom IDs
    ) {
      //region Admin modals
      // Stat Modal
      case "stats-giver-modal":
        // get input values

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

        if (
          variant !== "strength" &&
          variant !== "will" &&
          variant !== "cognition" &&
          variant !== "level" &&
          variant !== "exp"
        ) {
          // Check if the variant is not a valid variant
          await modalInteraction.reply({
            // Reply with an error message if so
            content:
              "Please enter a valid variant. Valid variants are 'strength', 'will', 'cognition', 'level', and 'exp'.",
            ephemeral: true,
          });
          return;
        }

        if (modifier !== "add" && modifier !== "remove" && modifier !== "set") {
          // Check if the modifier is not a valid modifier
          await modalInteraction.reply({
            // Reply with an error message if so
            content:
              "Please enter a valid modifier. Valid modifiers are 'add', 'remove', and 'set'.",
            ephemeral: true,
          });
          return;
        }

        if (isNaN(statAmount) || statAmount < 0) {
          // Check if the stat amount is not a valid number
          await modalInteraction.reply({
            // Reply with an error message if so
            content: "Please enter a valid positive number for the stat amount",
            ephemeral: true,
          });
          return;
        }

        actions.user.giveStat(modalInteraction, {
          variant,
          modifier,
          amount: statAmount,
          userId: statsTargetUserInput,
        });
        break;

      // Skill Modals
      case "create-skill-modal":
        // get input values

        const createSkillName = modalInteraction.fields
          .getTextInputValue("create-skill-name-input")
          .toLowerCase();
        const createSkillDescription =
          modalInteraction.fields.getTextInputValue(
            "create-skill-description-input"
          );
        const createSkillAction = modalInteraction.fields.getTextInputValue(
          "create-skill-action-input"
        );
        const createSkillCooldown = parseInt(
          modalInteraction.fields.getTextInputValue(
            "create-skill-cooldown-input"
          )
        );
        const createSkillWill = parseInt(
          modalInteraction.fields.getTextInputValue("create-skill-will-input")
        );

        actions.skill
          .create(modalInteraction, {
            name: createSkillName,
            description: createSkillDescription,
            action: createSkillAction,
            cooldown: createSkillCooldown,
            will: createSkillWill,
          })
          .catch((error) => {
            if (error instanceof SkillAlreadyExistsError) {
              modalInteraction.reply({
                content: "A skill with that name already exists.",
                ephemeral: true,
              });
            }
          });
        break;

      case "delete-skill-modal":
        // get input values

        const deleteSkillName = modalInteraction.fields
          .getTextInputValue("delete-skill-name-input")
          .toLowerCase();

        await actions.skill.delete(modalInteraction, deleteSkillName);
        break;

      case "grant-skill-modal":
        // get input values

        const grantSkillName = modalInteraction.fields
          .getTextInputValue("grant-skill-name-input")
          .toLowerCase();
        const grantSkillTarget = modalInteraction.fields.getTextInputValue(
          "grant-skill-target-input"
        );

        await actions.skill.grant(modalInteraction, {
          skillName: grantSkillName,
          targetId: grantSkillTarget,
        });
        break;

      case "revoke-skill-modal":
        // get input values

        const revokeSkillName = modalInteraction.fields
          .getTextInputValue("revoke-skill-name-input")
          .toLowerCase();
        const revokeSkillTarget = modalInteraction.fields.getTextInputValue(
          "revoke-skill-target-input"
        );

        await actions.skill.revoke(modalInteraction, {
          skillName: revokeSkillName,
          targetId: revokeSkillTarget,
        });
        break;

      // Item Modals
      case "create-item-modal":
        // get input values

        const itemName = modalInteraction.fields
          .getTextInputValue("create-item-name-input")
          .toLowerCase();
        const itemDescription = modalInteraction.fields.getTextInputValue(
          "create-item-description-input"
        );
        const itemActionable = modalInteraction.fields
          .getTextInputValue("create-item-actionable-input")
          .toLowerCase();

        if (
          itemActionable !== "consume" &&
          itemActionable !== "use" &&
          itemActionable !== "interact"
        ) {
          await modalInteraction.reply({
            content:
              "Please enter a valid action. Valid actions are 'consume', 'use', and 'interact'.",
            ephemeral: true,
          });
          return;
        }

        actions.item.create(modalInteraction, {
          itemName,
          itemDescription: itemDescription,
          itemActionType: itemActionable,
        });

        break;

      case "give-item-modal":
        // get input values

        const giveItemName = modalInteraction.fields
          .getTextInputValue("give-item-name-input")
          .toLowerCase();

        const giveItemTarget = modalInteraction.fields.getTextInputValue(
          "give-item-target-input"
        );

        const giveItemAmount = parseInt(
          modalInteraction.fields.getTextInputValue("give-item-amount-input")
        );

        if (isNaN(giveItemAmount)) {
          await modalInteraction.reply({
            content: "Amount must be a number.",
            ephemeral: true,
          });
          return;
        }

        await actions.item.give(modalInteraction, {
          itemName: giveItemName,
          targetId: giveItemTarget,
          amount: giveItemAmount,
        });
        break;

      case "revoke-item-modal":
        // get input values

        const removeItemName = modalInteraction.fields
          .getTextInputValue("revoke-item-name-input")
          .toLowerCase();

        const removeItemTarget = modalInteraction.fields.getTextInputValue(
          "revoke-item-target-input"
        );

        await actions.item.revoke(modalInteraction, {
          itemName: removeItemName,
          targetId: removeItemTarget,
        });
        break;

      case "delete-item-modal":
        // get input values

        const deleteItemName = modalInteraction.fields
          .getTextInputValue("delete-item-name-input")
          .toLowerCase();

        // Validate the inputs

        await actions.item.delete(modalInteraction, deleteItemName);
        break;

      // Status Effect Modals
      case "create-status-effect-modal":
        // get input values

        const statusEffectName = modalInteraction.fields
          .getTextInputValue("create-status-effect-name-input")
          .toLowerCase();
        const statusEffectDuration = parseInt(
          modalInteraction.fields
            .getTextInputValue("create-status-effect-duration-input")
            .toLowerCase()
        );
        const statusEffectDescription =
          modalInteraction.fields.getTextInputValue(
            "create-status-effect-description-input"
          );

        if (isNaN(statusEffectDuration) || statusEffectDuration < 0) {
          await modalInteraction.reply({
            content: "Duration must be a valid positive number.",
            ephemeral: true,
          });
          return;
        }

        actions.statusEffect.create(modalInteraction, {
          name: statusEffectName,
          duration: statusEffectDuration,
          description: statusEffectDescription,
        });

        break;

      case "delete-status-effect-modal":
        // get input values

        const deleteStatusEffectName = modalInteraction.fields
          .getTextInputValue("delete-status-effect-name-input")
          .toLowerCase();

        // Validate the inputs
        actions.statusEffect.delete(modalInteraction, deleteStatusEffectName);

        break;

      case "grant-status-effect-modal":
        // get input values
        const grantStatusEffectName = modalInteraction.fields.getTextInputValue(
          "grant-status-effect-name-input"
        );
        const grantStatusEffectTarget =
          modalInteraction.fields.getTextInputValue(
            "grant-status-effect-target-input"
          );

        await actions.statusEffect.grant(modalInteraction, {
          statusEffectName: grantStatusEffectName,
          targetId: grantStatusEffectTarget,
        });
        break;

      // Environment Modals
      case "create-environment-modal":
        // get input values
        const createEnvironmentName = modalInteraction.fields
          .getTextInputValue("create-environment-name-input") // get name input
          .toLowerCase(); // convert to lowercase
        const createEnvironmentItemsPromises: Array<string> =
          modalInteraction.fields
            .getTextInputValue("create-environment-items-input") // get items input
            .toLowerCase() // convert to lowercase
            .split(",") // convert to array, split by comma
            .map((itemName) => itemName.trim()); // trim whitespace
        const createEnvironmentChannel: string =
          // get channel input
          modalInteraction.fields.getTextInputValue(
            "create-environment-channel-input"
          );

        await actions.environment
          .create(modalInteraction, {
            name: createEnvironmentName,
            items: createEnvironmentItemsPromises,
            channel: createEnvironmentChannel,
          })
          .catch((error) => {
            if (error instanceof EnvironmentCreationError) {
              modalInteraction.reply({
                content: "Error creating environment.",
                ephemeral: true,
              });
            } else if (error instanceof ChannelNotFoundError) {
              modalInteraction.reply({
                content: "Channel not found.",
              });
            }
          });
        break;

      case "edit-environment-name-modal":
        // get input values
        const editEnvironmentName = modalInteraction.fields
          .getTextInputValue("edit-environment-name-input")
          .toLowerCase();

        const editEnvironmentNewName = modalInteraction.fields
          .getTextInputValue("edit-environment-new-name-input")
          .toLowerCase();

        await actions.environment.edit.name(modalInteraction, {
          oldName: editEnvironmentName,
          newName: editEnvironmentNewName,
        });
        break;

      case "edit-environment-items-modal":
        // get input values
        const editEnvironmentItemsName: string = modalInteraction.fields
          .getTextInputValue("edit-environment-name-input")
          .toLowerCase();

        const editEnvironmentItemsOperator =
          modalInteraction.fields.getTextInputValue(
            "edit-environment-items-operator-input"
          );
        const editEnvironmentItemsPromises: Array<string> =
          modalInteraction.fields
            .getTextInputValue("edit-environment-items-input")
            .toLowerCase()
            .split(",")
            .map((item) => item.trim());

        if (
          editEnvironmentItemsOperator !== "add" &&
          editEnvironmentItemsOperator !== "remove" &&
          editEnvironmentItemsOperator !== "set"
        ) {
          await modalInteraction.reply({
            content: "Invalid operator. Must be 'add', 'remove', or 'set'.",
            ephemeral: true,
          });
          return;
        }

        await actions.environment.edit.items(modalInteraction, {
          name: editEnvironmentItemsName,
          operator: editEnvironmentItemsOperator,
          items: editEnvironmentItemsPromises,
        });
        break;

      case "edit-environment-channel-modal":
        // get input values
        const editEnvironmentChannelName: string = modalInteraction.fields
          .getTextInputValue("edit-environment-name-input")
          .toLowerCase();
        const editEnvironmentChannel: string = modalInteraction.fields
          .getTextInputValue("edit-environment-channel-input")
          .toLowerCase();

        await actions.environment.edit.channel(modalInteraction, {
          name: editEnvironmentChannelName,
          channel: editEnvironmentChannel,
        });
        break;

      case "edit-environment-adjacents-modal":
        // get input values
        const editEnvironmentAdjacentsName: string = modalInteraction.fields
          .getTextInputValue("edit-environment-name-input")
          .toLowerCase()
          .trim();

        const editEnvironmentAdjacentsModifier = modalInteraction.fields
          .getTextInputValue("edit-environment-adjacents-modifier-input")
          .toLowerCase()
          .trim();

        const editEnvironmentAdjacents = modalInteraction.fields
          .getTextInputValue("edit-environment-adjacents-input")
          .toLowerCase()
          .split(",")
          .map((adjacent) => adjacent.trim());

        break;

      case "delete-environment-modal":
        // get input values
        const deleteEnvironmentName: string = modalInteraction.fields
          .getTextInputValue("delete-environment-name-input")
          .toLowerCase();

        await actions.environment.delete(modalInteraction, {
          name: deleteEnvironmentName,
        });
        break;

      case "user-relocator-modal":
        // get input values
        const relocateNameInput = modalInteraction.fields
          .getTextInputValue("environment-name-input")
          .toLowerCase();
        const relocateUserId = modalInteraction.fields
          .getTextInputValue("environment-user-input")
          .toLowerCase()
          .split(",")
          .map((id: string) => id.trim());

        await actions.user.relocate(modalInteraction, {
          name: relocateNameInput,
          users: relocateUserId,
        });
        break;

      // Bot Perform Modals
      case "send-message-modal":
        // get input values
        let sendMessageChannel = modalInteraction.fields
          .getTextInputValue("send-message-target-channel-input")
          .toLowerCase();
        const sendMessageContent = modalInteraction.fields.getTextInputValue(
          "send-message-content-input"
        );

        await actions.bot.send(modalInteraction, {
          channel: sendMessageChannel,
          content: sendMessageContent,
        });
        break;

      // Moderation Modals
      case "ban-user-modal":
        // get input values

        const banUserId = modalInteraction.fields.getTextInputValue(
          "ban-user-target-input"
        );
        const banUserReason = modalInteraction.fields.getTextInputValue(
          "ban-user-reason-input"
        );

        await actions.user.ban(modalInteraction, {
          user: banUserId,
          reason: banUserReason,
        });
        break;

      case "kick-user-modal":
        // get input values

        const kickUserId = modalInteraction.fields.getTextInputValue(
          "kick-user-target-input"
        );
        const kickUserReason =
          modalInteraction.fields.getTextInputValue("kick-user-reason-input") ||
          "No reason provided";

        await actions.user.kick(modalInteraction, {
          userId: kickUserId,
          reason: kickUserReason,
        });
        break;

      case "timeout-user-modal":
        // get input values

        const timeoutUserId = modalInteraction.fields.getTextInputValue(
          "timeout-user-target-input"
        );
        const timeoutUserDuration = modalInteraction.fields.getTextInputValue(
          "timeout-user-duration-input"
        );
        const timeoutUserReason =
          modalInteraction.fields.getTextInputValue(
            "timeout-user-reason-input"
          ) || "No reason provided";

        await actions.user.timeout(modalInteraction, {
          userId: timeoutUserId,
          duration: timeoutUserDuration,
          reason: timeoutUserReason,
        });
        break;

      //region Onboarding modals

      case "onboarding-modal":
        const onboardingName = modalInteraction.fields.getTextInputValue(
          "onboarding-modal-name"
        );
        let onboardingUser = await UserData.findOne({
          id: modalInteraction.user.id,
          guild: modalInteraction.guild.id,
        });

        if (!onboardingUser) {
          onboardingUser = new UserData({
            id: modalInteraction.user.id,
            guild: modalInteraction.guild.id,
            name: onboardingName,
          });
        }

        onboardingUser.name = onboardingName;
        await onboardingUser.save();
        const onboardingSpeciesSelection = new StringSelectMenuBuilder()
          .setCustomId("onboarding-species-selection")
          .setPlaceholder("Select your species")
          .addOptions(
            new StringSelectMenuOptionBuilder({
              label: "Human",
              value: "Human",
              emoji: "🧑",
              description: "Humans are the most common and versatile species.",
            }),
            new StringSelectMenuOptionBuilder({
              label: "Elf",
              value: "Elf",
              emoji: "🧝",
              description:
                "Elves are known for their magical abilities and agility.",
            }),
            new StringSelectMenuOptionBuilder({
              label: "Dwarf",
              value: "Dwarf",
              emoji: "🧙",
              description:
                "Dwarves are known for their dexterity and intelligence.",
            }),
            new StringSelectMenuOptionBuilder({
              label: "Orc",
              value: "Orc",
              emoji: "🧛",
              description: "Orcs are known for their resilience and strength.",
            })
          );
        const onboardingSpeciesSelectionRow =
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            onboardingSpeciesSelection
          );

        const reply = await modalInteraction.reply({
          content:
            "The database has been updated, your name has been saved. Please select your species",
          components: [onboardingSpeciesSelectionRow],
          ephemeral: true,
        });

        setTimeout(async () => {
          await reply.delete();
        }, 5 * 60 * 1000);
        break;

      default:
        modalInteraction.reply({
          content: "Something went wrong, Modal not found.",
          ephemeral: true,
        });

        log({
          folder: path.join(__dirname, "..", "..", "..", "logs"),
          header: "Modal not found",
          payload: `${modalInteraction.customId} - ${modalInteraction.user.id} - ${modalInteraction.user.tag}`,
        });
        break;
    }
  } catch (error) {
    console.error("Error processing a modal: ", error);

    await modalInteraction
      .reply({
        content:
          "Something went wrong, the modal could not be processed correctly.",
        ephemeral: true,
      })
      .catch((err) =>
        log({
          header: "Response error",
          payload: `${err}`,
          type: "error",
        })
      );
    log({
      header: "Error processing a modal",
      payload: `${modalInteraction.customId} - ${modalInteraction.user.id} - ${modalInteraction.user.tag}\n${error}`,
      type: "error",
    });
  }
};
