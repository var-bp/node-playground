import { usersService } from '../../services/v1/index.js';
import asyncHandler from '../../utils/asyncHandler.js';

const getUsers = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await usersService.getUsers(req.query);
  res.status(statusCode).json(data);
});

const getUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await usersService.getUser(req.params);
  res.status(statusCode).json(data);
});

const createUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await usersService.createUser(req.body);
  res.status(statusCode).json(data);
});

const updateUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await usersService.updateUser(req.params, req.body);
  res.status(statusCode).json(data);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await usersService.deleteUser(req.params);
  res.status(statusCode).json(data);
});

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
