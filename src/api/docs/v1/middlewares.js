import path from 'path';
import multer from 'multer';
import { randomUUID } from 'crypto'; // https://dev.to/galkin/crypto-randomuuid-vs-uuid-v4-47i5
import projectRoot from '../../../utils/projectRoot.cjs';

const upload = multer({
  limits: { fileSize: 5242880 }, // 5MB
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype === 'application/pdf');
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(projectRoot, './src/storage'));
    },
    filename: (req, file, cb) => {
      cb(null, `${randomUUID()}_${file.originalname}`);
    },
  }),
});

export default {
  uploadFile: upload.fields([{ name: 'file', maxCount: 1 }]),
};
