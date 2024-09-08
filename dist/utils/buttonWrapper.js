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
exports.default = buttonWrapper;
const { ActionRowBuilder } = require("discord.js");
function buttonWrapper(buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        const components = [];
        let currentRow = new ActionRowBuilder();
        for (let a = 0; a < buttons.length && a < 25; a++) {
            if (a % 5 === 0 && a > 0) {
                components.push(currentRow);
                currentRow = new ActionRowBuilder();
            }
            currentRow.addComponents(buttons[a]);
        }
        if (currentRow.components.length > 0) {
            components.push(currentRow);
        }
        return components;
    });
}
