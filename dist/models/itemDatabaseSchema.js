"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model for item database
const mongoose_1 = require("mongoose"); // Import the mongoose library.
const itemData = new mongoose_1.Schema({
    // Define the schema.
    name: {
        // Define the item name.
        type: String,
        required: true,
    },
    description: {
        // Define the item description.
        type: String,
        required: true,
    },
    actionType: {
        // Define the item actionable.
        type: String,
        required: true,
    },
    users: {
        // Define the item users.
        type: (Array),
        default: [],
    },
    environments: {
        // Define the item environments.
        type: (Array),
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("itemData", itemData); // Export the model.
