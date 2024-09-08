"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const itemData = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemActionable: {
        type: String,
        required: true,
    },
    itemAction: {
        type: String,
        required: true,
    },
    itemUsers: {
        type: Array,
        default: [],
    },
});
exports.default = model("itemData", itemData);
