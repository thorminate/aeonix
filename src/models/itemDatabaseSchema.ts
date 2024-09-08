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

export default model("itemData", itemData);
