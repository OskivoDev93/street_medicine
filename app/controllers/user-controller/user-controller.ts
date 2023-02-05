import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const User = require("../../models/user-model");
import { v4 as uuidV4, v4 } from "uuid";
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ message: "get all USERS" });
});

const getOneUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `${req.params.id} retrieved` });
};

const createUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("name is required");
  }
  const userCreate = await User.create({
    name: req.body.name,
    email: req.body.email,
    uuid: uuidV4(),
  });
  if (!userCreate) {
    throw new Error("User failed to be created");
  }
  res.status(201).json({
    message: "user created",
    details: {
      userCreate,
    },
  });
});

const deleteOneUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `${req.params.id} deleted` });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  deleteOneUser,
};
