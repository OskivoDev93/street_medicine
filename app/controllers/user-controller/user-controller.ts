import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "get all USERS" });
};

const getOneUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `${req.params.id} retrieved` });
};

const createUser = (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("name is required");
  }
  res.status(201).json({ message: "user created" });
};

const deleteOneUser = (req: Request, res: Response) => {
  res.status(200).json({ message: `${req.params.id} deleted` });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  deleteOneUser,
};
