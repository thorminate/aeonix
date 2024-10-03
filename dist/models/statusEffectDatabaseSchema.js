"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model for status effect database
const mongoose_1 = require("mongoose"); // Import the mongoose library.
const statusEffectData = new mongoose_1.Schema({
    // Define the schema.
    name: {
        // Define the status effect name.
        type: String,
        required: true,
    },
    duration: {
        // Define the status effect duration.
        type: Number,
        required: true,
    },
    description: {
        // Define the status effect description.
        type: String,
        required: true,
    },
    users: {
        // Define the status effect users.
        type: (Array),
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("statusEffectData", statusEffectData); // Export the model.
