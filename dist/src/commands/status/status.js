"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// shows your status
const discord_js_1 = require("discord.js");
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
const calculateLevelExp_1 = __importDefault(require("../../utils/calculateLevelExp"));
const buttonWrapper_1 = __importDefault(require("../../utils/buttonWrapper"));
const commandVerify_1 = __importDefault(require("../../utils/commandVerify"));
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
    callback: async (bot, interaction) => {
        (0, commandVerify_1.default)(interaction);
        try {
            if (!interaction.isCommand())
                return;
            // defer reply and make it ephemeral
            await interaction.deferReply({
                ephemeral: true,
            });
            //define targetUserObj
            const targetUserId = interaction.member.id;
            const targetUserObj = await interaction.guild.members.fetch(targetUserId);
            // find user in database and then get their data
            const targetUserData = await userDatabaseSchema_1.default.findOne({
                userId: targetUserId,
                guildId: interaction.guild.id,
            });
            // if user doesn't exist in database, say so and return
            if (!targetUserData) {
                interaction.editReply("You haven't been integrated into the system yet. Head over to <#1270790941892153404>");
                return;
            }
            let skillsDisplay = "";
            if (targetUserData.skills && targetUserData.skills.length > 0) {
                skillsDisplay = targetUserData.skills
                    .map((skill) => {
                    const skillUppercaseLetter = skill[0].toUpperCase();
                    return `${skillUppercaseLetter}${skill.slice(1)}`;
                })
                    .join(", ");
            }
            else {
                skillsDisplay = "No skills learned yet";
            }
            async function playerMenu(prevAdmin = false) {
                if (!interaction.isCommand())
                    return;
                const inventory = new discord_js_1.ButtonBuilder()
                    .setLabel("Inventory")
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setCustomId("inventory")
                    .setDisabled(false);
                let playerReply;
                if (prevAdmin === true) {
                    const backToAdmin = new discord_js_1.ButtonBuilder()
                        .setLabel("Reload as admin")
                        .setStyle(discord_js_1.ButtonStyle.Primary)
                        .setCustomId("backAsAdmin")
                        .setDisabled(false);
                    playerReply = await interaction.editReply({
                        content: `Hello <@${targetUserObj.user.id}>!\nYour level is **${targetUserData.level}** and you have **${targetUserData.exp}/${(0, calculateLevelExp_1.default)(targetUserData.level + 1)}** experience.\n# ***Stats:***\n**Strength:** ***${targetUserData.strength}***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${targetUserData.cognition}***\n# ***Skills:***\n${skillsDisplay}`,
                        //@ts-ignore
                        ephemeral: true,
                        components: (0, buttonWrapper_1.default)([inventory, backToAdmin]),
                    });
                }
                else {
                    playerReply = await interaction.editReply({
                        content: `Hello <@${targetUserObj.user.id}>!\nYour level is **${targetUserData.level}** and you have **${targetUserData.exp}/${(0, calculateLevelExp_1.default)(targetUserData.level + 1)}** experience.\n# ***Stats:***\n**Strength:** ***${targetUserData.strength}***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${targetUserData.cognition}***\n# ***Skills:***\n${skillsDisplay}`,
                        //@ts-ignore
                        ephemeral: true,
                        components: (0, buttonWrapper_1.default)([inventory]),
                    });
                }
                // make sure the user who ran the command is the one who clicked the button
                const filter = (i) => i.user.id === interaction.user.id;
                // collect button clicks
                const collector = playerReply.createMessageComponentCollector({
                    componentType: discord_js_1.ComponentType.Button,
                    filter,
                });
                collector.on("collect", async (i) => {
                    if (i.replied)
                        return;
                    if (i.customId === "inventory") {
                        const formattedInventory = targetUserData.inventory
                            .map((item) => `${item.itemName}`)
                            .join(",\n") || "is empty...";
                        await i.reply({
                            content: `## Your inventory\n ${formattedInventory}`,
                            ephemeral: true,
                        });
                    }
                    else if (i.customId === "backAsAdmin") {
                        await adminMenu(true);
                    }
                });
            }
            async function adminMenu(prevPlayer = false) {
                if (!interaction.isCommand())
                    return;
                // set up admin button collection
                const playerModification = new discord_js_1.ButtonBuilder()
                    .setLabel("Modify Player Data")
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setCustomId("player-modification")
                    .setDisabled(false);
                const moderation = new discord_js_1.ButtonBuilder()
                    .setLabel("Moderation")
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setCustomId("moderation")
                    .setDisabled(false);
                const botPerform = new discord_js_1.ButtonBuilder()
                    .setLabel("Perform Bot Action")
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setCustomId("bot-perform")
                    .setDisabled(false);
                const playerMode = new discord_js_1.ButtonBuilder()
                    .setLabel("Reload as Player")
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setCustomId("player-mode")
                    .setDisabled(false);
                // send welcome message to admin
                const adminReply = await interaction.editReply({
                    content: `Welcome Administrator <@${targetUserObj.user.id}>!\nYour level is **${targetUserData.level}** and you have **${targetUserData.exp}/${(0, calculateLevelExp_1.default)(targetUserData.level + 1)}** experience.\n# ***Stats:***\n**Strength:** ***${targetUserData.strength}***\n**Will:** ***${targetUserData.will}***\n**Cognition:** ***${targetUserData.cognition}***\n# ***Skills:***\n${skillsDisplay}\n\n-# What action would you like to perform?`,
                    components: (0, buttonWrapper_1.default)([
                        playerModification,
                        moderation,
                        botPerform,
                        playerMode,
                    ]),
                });
                // make sure the user who ran the command is the one who clicked the button
                const filter = (i) => i.user.id === interaction.user.id;
                // collect button clicks
                const collector = adminReply.createMessageComponentCollector({
                    componentType: discord_js_1.ComponentType.Button,
                    filter,
                });
                collector.on("collect", async (buttonInteraction) => {
                    switch (buttonInteraction.customId) {
                        // Initial Buttons
                        case "player-modification":
                            // Handle "Modify Player Data" button click
                            const updatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: updatedComponents,
                            });
                            // Define buttons for submenu
                            const modifyStatsButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Modify Stats")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("modify_stats")
                                .setDisabled(false);
                            const modifySkillsButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Modify Skills")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("modify_skills")
                                .setDisabled(false);
                            const modifyItemsButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Modify Items")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("modify_items")
                                .setDisabled(false);
                            const modifyStatusEffectsButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Modify Status Effects")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("modify_status_effects")
                                .setDisabled(false);
                            if (prevPlayer === true) {
                                await buttonInteraction.editReply({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        modifyStatsButton,
                                        modifySkillsButton,
                                        modifyItemsButton,
                                        modifyStatusEffectsButton,
                                    ]),
                                });
                            }
                            else {
                                await buttonInteraction.update({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        modifyStatsButton,
                                        modifySkillsButton,
                                        modifyItemsButton,
                                        modifyStatusEffectsButton,
                                    ]),
                                });
                            }
                            break;
                        case "moderation":
                            // Handle "Moderation" button click
                            const moderationUpdatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: moderationUpdatedComponents,
                            });
                            // Define buttons for submenu
                            const banUserButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Ban User")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("ban_user")
                                .setDisabled(false);
                            const kickUserButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Kick User")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("kick_user")
                                .setDisabled(false);
                            const timeoutUserButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Timeout User")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("timeout_user")
                                .setDisabled(false);
                            await buttonInteraction.update({
                                content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                components: (0, buttonWrapper_1.default)([
                                    banUserButton,
                                    kickUserButton,
                                    timeoutUserButton,
                                ]),
                            });
                            break;
                        case "player-mode":
                            // Handle "Reload as Player" button click
                            await playerMenu(true);
                            break;
                        case "bot-perform":
                            // Handle "Perform Bot Action" button click
                            const botPerformUpdatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: botPerformUpdatedComponents,
                            });
                            // Define buttons for submenu
                            const botPerformSendMessageButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Send Message")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("send_message")
                                .setDisabled(false);
                            if (prevPlayer === true) {
                                await buttonInteraction.editReply({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([botPerformSendMessageButton]),
                                });
                            }
                            else {
                                await buttonInteraction.update({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([botPerformSendMessageButton]),
                                });
                            }
                            break;
                        // Player Modification Buttons
                        case "modify_stats":
                            // Handle "Modify Stats" button click
                            await statusAdminHandler.handleStatsGiverModal(buttonInteraction);
                            break;
                        case "modify_skills":
                            // Handle "Modify Player Data" button click
                            const modifySkillsUpdatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: modifySkillsUpdatedComponents,
                            });
                            // Define buttons for submenu
                            const createSkillButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Create Skill")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("create_skill")
                                .setDisabled(false);
                            const deleteSkillButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Delete Skill")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("delete_skill")
                                .setDisabled(false);
                            const grantSkillButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Grant Skill")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("grant_skill")
                                .setDisabled(false);
                            const revokeSkillButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Revoke Skill")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("revoke_skill")
                                .setDisabled(false);
                            if (prevPlayer === true) {
                                await buttonInteraction.editReply({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createSkillButton,
                                        grantSkillButton,
                                        revokeSkillButton,
                                        deleteSkillButton,
                                    ]),
                                });
                            }
                            else {
                                await buttonInteraction.update({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createSkillButton,
                                        grantSkillButton,
                                        revokeSkillButton,
                                        deleteSkillButton,
                                    ]),
                                });
                            }
                            break;
                        case "modify_items":
                            // Handle "Modify Items" button click
                            const modifyItemsUpdatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: modifyItemsUpdatedComponents,
                            });
                            // Define buttons for submenu
                            const createItemButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Create Item")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("create_item")
                                .setDisabled(false);
                            const deleteItemButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Delete Item")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("delete_item")
                                .setDisabled(false);
                            const giveItemButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Give Item")
                                .setStyle(discord_js_1.ButtonStyle.Primary)
                                .setCustomId("give_item")
                                .setDisabled(false);
                            const removeItemButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Remove Item")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("remove_item")
                                .setDisabled(false);
                            if (prevPlayer === true) {
                                await buttonInteraction.editReply({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createItemButton,
                                        giveItemButton,
                                        removeItemButton,
                                        deleteItemButton,
                                    ]),
                                });
                            }
                            else {
                                await buttonInteraction.update({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createItemButton,
                                        giveItemButton,
                                        removeItemButton,
                                        deleteItemButton,
                                    ]),
                                });
                            }
                            break;
                        case "modify_status_effects":
                            // Handle "Modify Status Effects" button click
                            const modifyStatusEffectsUpdatedComponents = adminReply.components.map((row) => {
                                return discord_js_1.ActionRowBuilder.from(row).setComponents(row.components.map((button) => {
                                    return button;
                                }));
                            });
                            // Edit the original reply to disable the button
                            await interaction.editReply({
                                content: `loading...`,
                                components: modifyStatusEffectsUpdatedComponents,
                            });
                            // Define buttons for submenu
                            const createStatusEffectButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Create Status Effect")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("create_status_effect")
                                .setDisabled(false);
                            const deleteStatusEffectButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Delete Status Effect")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("delete_status_effect")
                                .setDisabled(false);
                            const grantStatusEffectButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Grant Status Effect")
                                .setStyle(discord_js_1.ButtonStyle.Secondary)
                                .setCustomId("grant_status_effect")
                                .setDisabled(false);
                            const revokeStatusEffectButton = new discord_js_1.ButtonBuilder()
                                .setLabel("Revoke Status Effect")
                                .setStyle(discord_js_1.ButtonStyle.Danger)
                                .setCustomId("revoke_status_effect")
                                .setDisabled(false);
                            if (prevPlayer === true) {
                                await buttonInteraction.editReply({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createStatusEffectButton,
                                        grantStatusEffectButton,
                                        revokeStatusEffectButton,
                                        deleteStatusEffectButton,
                                    ]),
                                });
                            }
                            else {
                                await buttonInteraction.update({
                                    content: `What would you like to do, Administrator ${targetUserObj.user.globalName.substr(0, 1)}?`,
                                    components: (0, buttonWrapper_1.default)([
                                        createStatusEffectButton,
                                        grantStatusEffectButton,
                                        revokeStatusEffectButton,
                                        deleteStatusEffectButton,
                                    ]),
                                });
                            }
                            break;
                        // Skill Modification Buttons
                        case "create_skill":
                            // Handle "Create Skill" button click
                            await statusAdminHandler.handleCreateSkillModal(buttonInteraction);
                            break;
                        case "delete_skill":
                            // Handle "Delete Skill" button click
                            await statusAdminHandler.handleDeleteSkillModal(buttonInteraction);
                            break;
                        case "grant_skill":
                            // Handle "Grant Skill" button click
                            await statusAdminHandler.handleGrantSkillModal(buttonInteraction);
                            break;
                        case "revoke_skill":
                            // Handle "Revoke Skill" button click
                            await statusAdminHandler.handleRevokeSkillModal(buttonInteraction);
                            break;
                        // Item Modification Buttons
                        case "create_item":
                            // Handle "Create Item" button click
                            await statusAdminHandler.handleCreateItemModal(buttonInteraction);
                            break;
                        case "give_item":
                            // Handle "Give Item" button click
                            await statusAdminHandler.handleGiveItemModal(buttonInteraction);
                            break;
                        case "remove_item":
                            // Handle "Remove Item" button click
                            await statusAdminHandler.handleRemoveItemModal(buttonInteraction);
                            break;
                        case "delete_item":
                            // Handle "Delete Item" button click
                            await statusAdminHandler.handleDeleteItemModal(buttonInteraction);
                            break;
                        // Bot Perform Buttons
                        case "send_message":
                            // Handle "Send Message" button click
                            await statusAdminHandler.handleSendMessageModal(buttonInteraction);
                            break;
                        // Status Effect Modification Buttons
                        case "create_status_effect":
                            // Handle "Create Status Effect" button click
                            await statusAdminHandler.handleCreateStatusEffectModal(buttonInteraction);
                            break;
                        case "delete_status_effect":
                            // Handle "Delete Status Effect" button click
                            await statusAdminHandler.handleDeleteStatusEffectModal(buttonInteraction);
                            break;
                        case "grant_status_effect":
                            // Handle "Grant Status Effect" button click
                            await statusAdminHandler.handleGrantStatusEffectModal(buttonInteraction);
                            break;
                        case "revoke_status_effect":
                            // Handle "Revoke Status Effect" button click
                            await statusAdminHandler.handleRevokeStatusEffectModal(buttonInteraction);
                            break;
                        // Moderation Buttons
                        case "ban_user":
                            // Handle "Ban User" button click
                            await statusAdminHandler.handleBanUserModal(buttonInteraction);
                            break;
                        case "kick_user":
                            // Handle "Kick User" button click
                            await statusAdminHandler.handleKickUserModal(buttonInteraction);
                            break;
                        case "timeout_user":
                            // Handle "Timeout User" button click
                            await statusAdminHandler.handleTimeoutUserModal(buttonInteraction);
                            break;
                    }
                });
            }
            if (interaction.member.permissions instanceof discord_js_1.PermissionsBitField)
                if (interaction.member.permissions.has(discord_js_1.PermissionFlagsBits.Administrator)) {
                    adminMenu();
                }
                else {
                    playerMenu();
                }
        }
        catch (error) {
            console.log(`There was an error running status: ${error}`);
        }
    },
};
