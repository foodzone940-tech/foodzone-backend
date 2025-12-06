const mongoose = require("mongoose");

const ProductAddonGroupSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    group_name: {
      type: String,
      required: true
    },
    is_required: {
      type: Boolean,
      default: false
    },
    max_selection: {
      type: Number,
      default: 1
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("ProductAddonGroup", ProductAddonGroupSchema);
