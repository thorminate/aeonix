"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model for skill database
const mongoose_1 = require("mongoose"); // Import the mongoose library.
const skillData = new mongoose_1.Schema({
    // Define the schema.
    name: {
        // Define the skill name.
        type: String,
        required: true,
    },
    description: {
        // Define the skill description.
        type: String,
        required: true,
    },
    action: {
        // Define the skill action.
        type: String,
        required: true,
    },
    cooldown: {
        // Define the skill cooldown.
        type: Number,
        required: true,
    },
    will: {
        // Define the skill will.
        type: Number,
        required: true,
    },
    users: {
        // Define the skill users.
        type: (Array),
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("skillData", skillData); // Export the model.
