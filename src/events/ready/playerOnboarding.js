const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (bot) => {
  const welcomeChannel = bot.channels.cache.get("1270790941892153404");
  welcomeChannel.bulkDelete(100);

  setTimeout(() => {
    const welcomeChannelBeginOnboarding = new ButtonBuilder()
      .setCustomId("welcome-channel-begin-onboarding")
      .setLabel("Begin Onboarding")
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);

    const welcomeChannelBeginOnboardingRow =
      new ActionRowBuilder().addComponents(welcomeChannelBeginOnboarding);

    welcomeChannel.send({
      content:
        "Hello, and welcome to The System!" +
        " This server is primarily for testing my bot, although we have tons of RP mashed in too!" +
        "\n\nYou are currently not able to see any channels other than a few for the onboarding process and the non-player-hangout area." +
        " These channels are for setting you up, (such as initializing your persona into the database, the persona being your digital presence with the system)" +
        " we will also go through the skill system and how other important stats work." +
        "\n\nWhen you have read through the information, please press the button below, and the bot will validate your persona's existence in the database," +
        " thereafter giving you the <@&1270791621289578607> role.",
      components: [welcomeChannelBeginOnboardingRow],
    });
  }, 1500);
};
