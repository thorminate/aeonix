"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelUp_1 = __importDefault(require("./levelUp"));
const giveStat_1 = __importDefault(require("./giveStat"));
const createSkill_1 = __importDefault(require("./createSkill"));
const grantSkill_1 = __importDefault(require("./grantSkill"));
const deleteSkill_1 = __importDefault(require("./deleteSkill"));
const revokeSkill_1 = __importDefault(require("./revokeSkill"));
/**
 * Index of all the actions
 */
exports.default = {
    user: {
        levelUp: levelUp_1.default,
        giveStat: giveStat_1.default,
    },
    skill: {
        create: createSkill_1.default,
        grant: grantSkill_1.default,
        delete: deleteSkill_1.default,
        revoke: revokeSkill_1.default,
    },
};
