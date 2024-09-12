"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemData = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("itemData", itemData);
