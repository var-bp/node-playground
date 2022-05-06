import services from './services';
import asyncHandler from '../../../utils/asyncHandler';

const uploadFile = asyncHandler(async (req, res) => {
  const { statusCode, ...data } = await services.uploadFile(req);
  res.status(statusCode).json(data);
});

export default {
  uploadFile,
};
