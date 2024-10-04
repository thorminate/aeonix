"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusEffectDatabaseSchema_1 = __importDefault(require("../../models/statusEffectDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * This gets all the status effects and makes sure they haven't expired.
 * @param {Client} bot The instantiating client.
 */
exports.default = async (bot) => {
    process.stdout.write("Validating all status effects... ");
    // first get all status effects in the database.
    const statusEffects = await statusEffectDatabaseSchema_1.default.find({});
    statusEffects.forEach(async (statusEffect) => {
        statusEffect.users.forEach(async (user) => {
            const userData = await userDatabaseSchema_1.default.findOne({
                id: user,
            });
            userData.statusEffects.filter((statusEffect) => {
                if (statusEffect.timestamp < Date.now()) {
                    return false;
                }
                else {
                    return true;
                }
            });
        });
    });
    process.stdout.write("Done!\n");
};
