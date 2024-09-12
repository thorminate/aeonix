"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const skillData = new mongoose_1.Schema({
    skillName: {
        type: String,
        required: true,
    },
    skillDescription: {
        type: String,
        required: true,
    },
    skillAction: {
        type: String,
        required: true,
    },
    skillCooldown: {
        type: Number,
        required: true,
    },
    skillWill: {
        type: Number,
        required: true,
    },
    skillUsers: {
        type: Array,
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("skillData", skillData);
