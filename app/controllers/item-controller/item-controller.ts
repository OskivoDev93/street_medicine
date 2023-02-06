import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const Item = require("../../models/item-model");
import { v4 as uuidV4, v4 } from "uuid";

export enum itemType {
  PILLS = "PILLS",
  OINTMENT = "OINTMENT",
  MISC = "MISCELLANIOUS",
}
const allowedValues = [itemType.PILLS, itemType.OINTMENT, itemType.MISC];

const createItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400);
    throw new Error("details are missing");
  }
  if (!allowedValues.includes(req.body.type)) {
    res.status(400);
    throw new Error("invalid type");
  }
  const item = await Item.create({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock,
    type: req.body.type,
    uuid: uuidV4(),
  });
  if (!item) {
    throw new Error("Item failed to create");
  }
  res.status(201).json({
    message: "Item created!",
    details: Item,
  });
});

const listItems = asyncHandler(async (req: Request, res: Response) => {
  let { name, type } = req.query;
  const limit = req.query.limit || "10";
  const page = req.query.page || "1";
  try {
    const limitValue = typeof limit === "string" ? parseInt(limit) : 10;
    const pageValue = typeof page === "string" ? parseInt(page) : 1;

    const data = await Item.find({
      name: name || { $exists: true },
      type: type || { $exists: true },
    })
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue);
    if (!data.length) {
      return res.status(400).json({ message: "Oops, no item found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const findItem = await Item.findOne({ uuid: req.params.uuid });
    if (!findItem) {
      res.status(404).json({ message: "Oops, item not found" });
    }
    const deleteOneItem = await Item.deleteOne({ uuid: req.params.uuid });
    res.status(200).json({ message: "Item successfully deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

const findOneItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const findOne = await Item.findOne({ uuid: req.params.uuid });
    if (!findOne) {
      res.status(404).json({ message: "Oops, item not found" });
    }
    res.status(200).json({
      message: "Item found",
      data: findOne,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateOneItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const findItem = await Item.findOne({
      uuid: req.params.uuid,
    });
    if (!findItem) {
      res.status(404).json({ message: "Oops, item not found" });
    }
    const update = await Item.findOneAndUpdate(
      {
        uuid: req.params.uuid,
      },
      req.body
    );
    if (!update) {
      res.status(400).json({ message: "Oops, update failed" });
    }
    res
      .status(200)
      .json({ message: "Item successfully updated", data: update });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createItem,
  listItems,
  deleteItem,
  findOneItem,
  updateOneItem,
};
