const { Schema, model } = require("mongoose");

const skillData = new Schema({
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

module.exports = model("skillData", skillData);
