import express from 'express';
import controllers from './controllers';
import validations from './validations';
import middlewares from './middlewares';

const router = express.Router();

router.post('/file', middlewares.uploadFile, validations.uploadFile, controllers.uploadFile);

export default router;
