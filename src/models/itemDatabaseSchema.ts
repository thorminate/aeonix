// Model for item database
import { Schema, model } from "mongoose"; // Import the mongoose library.

const itemData = new Schema({
  // Define the schema.
  itemName: {
    // Define the item name.
    type: String,
    required: true,
  },
  itemDescription: {
    // Define the item description.
    type: String,
    required: true,
  },
  itemActionable: {
    // Define the item actionable.
    type: String,
    required: true,
  },
  itemAction: {
    // Define the item action.
    type: String,
    required: true,
  },
  itemUsers: {
    // Define the item users.
    type: Array,
    default: [],
  },
});

export default model("itemData", itemData); // Export the model.
