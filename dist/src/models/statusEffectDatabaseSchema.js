"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statusEffectData = new mongoose_1.Schema({
    statusEffectName: {
        type: String,
        required: true,
    },
    statusEffectDescription: {
        type: String,
        required: true,
    },
    statusEffectDuration: {
        type: Number,
        required: true,
    },
    statusEffectAction: {
        type: String,
        required: true,
    },
    statusEffectUsers: {
        type: Array,
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("statusEffectData", statusEffectData);
