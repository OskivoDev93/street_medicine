import { prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

export enum itemType {
  PILLS = "Pills",
  OINTMENT = "Ointment",
  MISC = "Miscellanious",
}

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.itemSchema || mongoose.model("Item", itemSchema);
