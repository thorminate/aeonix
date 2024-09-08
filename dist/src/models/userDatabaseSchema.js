"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The database schema. Every user will have their own set of data, here we define what that data is.
const { Schema, model } = require("mongoose");
const userData = new Schema({
    // The unique ID of the user. Will be different for everyone
    userId: {
        type: String,
        required: true,
    },
    // The unique ID of the guild. Will be different for every guild.
    guildId: {
        type: String,
        required: true,
    },
    // The amount of exp the user has.
    exp: {
        type: Number,
        default: 0,
    },
    // The level of the user.
    level: {
        type: Number,
        default: 1,
    },
    // The amount of strength the user has.
    strength: {
        type: Number,
        default: 0,
    },
    // The amount of will the user has.
    will: {
        type: Number,
        default: 0,
    },
    // The amount of cognition/intelligence the user has.
    cognition: {
        type: Number,
        default: 0,
    },
    // array of skills
    skills: {
        type: Array,
        default: [],
    },
    // array of items in inventory
    inventory: {
        type: Array,
        default: [],
    },
    // The species of the user
    species: {
        type: String,
        default: "human",
    },
    // if the user has gone through the onboarding process
    isOnboard: {
        type: Boolean,
        default: false,
    },
    // class of the user
    class: {
        type: String,
        default: "warrior",
    },
    // will multiplier
    willMultiplier: {
        type: Number,
        default: 1,
    },
    // strength multiplier
    strengthMultiplier: {
        type: Number,
        default: 1,
    },
    // cognition multiplier
    cognitionMultiplier: {
        type: Number,
        default: 1,
    },
    // status effects
    statusEffects: {
        type: Array,
        default: [],
    },
});
// Exports the model
module.exports = model("userDatabase", userData);
