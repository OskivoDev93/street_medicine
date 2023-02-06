import * as mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema(
  {
    accountUuid: {
      type: String,
      required: true,
    },
    itemUuid: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.shoppingCartSchema ||
  mongoose.model("shopping-cart", shoppingCartSchema);
