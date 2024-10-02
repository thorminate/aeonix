"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelUp_1 = __importDefault(require("./user/levelUp"));
const giveStat_1 = __importDefault(require("./user/giveStat"));
const createSkill_1 = __importDefault(require("./skill/createSkill"));
const grantSkill_1 = __importDefault(require("./skill/grantSkill"));
const deleteSkill_1 = __importDefault(require("./skill/deleteSkill"));
const revokeSkill_1 = __importDefault(require("./skill/revokeSkill"));
/**
 * Index of all the actions
 * @type {Object}
 * @name actions
 * @memberof module:Actions
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
