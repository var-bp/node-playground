import { validationResult } from 'express-validator';
import errorFormatter from '../../../utils/errorFormatter';
import removeDuplicate from '../../../utils/removeDuplicate';

const uploadFile = async (req) => {
  const response = {
    statusCode: 200,
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    const { destination, path, ...data } = req.file;
    response.data = data;
  } else {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: removeDuplicate(errors.array()),
    };
  }
  return response;
};

export default {
  uploadFile,
};
