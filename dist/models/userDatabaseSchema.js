"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The schema for the user database
const mongoose_1 = require("mongoose"); // Import the mongoose library.
const userData = new mongoose_1.Schema({
    // Define the schema.
    id: {
        // Define the user id.
        type: String,
        required: true,
    },
    guild: {
        // Define the guild id.
        type: String,
        required: true,
    },
    environment: {
        // Define the current environment.
        type: String,
        default: "start",
    },
    level: {
        // Define the level.
        type: Number,
        default: 1,
    },
    exp: {
        // Define the exp.
        type: Number,
        default: 0,
    },
    strength: {
        // Define the strength.
        type: Number,
        default: 0,
    },
    will: {
        // Define the will.
        type: Number,
        default: 0,
    },
    cognition: {
        // Define the cognition.
        type: Number,
        default: 0,
    },
    species: {
        // Define the species.
        type: String,
        default: "human",
    },
    class: {
        // Define the class.
        type: String,
        default: "warrior",
    },
    skills: {
        // Define the skills.
        type: [String],
        default: [],
    },
    inventory: {
        // Define the inventory.
        type: (Array),
        default: [],
    },
    statusEffects: {
        // Define the status effects.
        type: (Array),
        default: [],
    },
    multipliers: {
        // Define the will multiplier.
        type: {
            strength: Number,
            will: Number,
            cognition: Number,
        },
        default: {
            strength: 1,
            will: 1,
            cognition: 1,
        },
    },
    isOnboard: {
        // Define the isOnboard.
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)("userDatabase", userData); // Export the model.
