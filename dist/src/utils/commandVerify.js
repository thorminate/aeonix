"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commandVerify;
function commandVerify(interaction) {
    if (!interaction.isCommand())
        return;
    if (!interaction.inGuild()) {
        interaction.reply("This command can only be used in a server");
        return false;
    }
    return true;
}
