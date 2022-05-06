import { checkSchema } from 'express-validator';

const uploadFile = [
  checkSchema({
    file: {
      custom: {
        // eslint-disable-next-line security/detect-object-injection
        options: (value, { req, path }) => !!req.files[path],
        errorMessage: 'You should upload a PDF file up to 5Mb',
      },
    },
  }),
];

export default {
  uploadFile,
};
