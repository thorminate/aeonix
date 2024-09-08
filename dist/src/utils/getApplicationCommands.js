"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (bot, guildId) => __awaiter(void 0, void 0, void 0, function* () {
    //define applicationCommands.
    let applicationCommands;
    // if guildId is not undefined, fetch guild commands. else fetch global commands.
    if (guildId) {
        const guild = yield bot.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    }
    else {
        applicationCommands = yield bot.application.commands;
    }
    // fetch and return application commands.
    yield applicationCommands.fetch();
    return applicationCommands;
});
