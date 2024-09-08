"use strict";
// when the bot is ready, log it to the console
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = consoleLog;
function consoleLog(bot) {
    console.log(`${bot.user.username} is now online!`);
}
