import services from './services';
import asyncHandler from '../../../utils/asyncHandler';

const getUsers = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.getUsers(req);
  res.status(statusCode).json(data);
});

const getUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.getUser(req);
  res.status(statusCode).json(data);
});

const createUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.createUser(req);
  res.status(statusCode).json(data);
});

const updateUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.updateUser(req);
  res.status(statusCode).json(data);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.deleteUser(req);
  res.status(statusCode).json(data);
});

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
