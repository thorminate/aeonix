"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const statusEffectData = new Schema({
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
exports.default = model("statusEffectData", statusEffectData);
