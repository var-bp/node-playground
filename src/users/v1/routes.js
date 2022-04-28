import express from 'express';
import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.get('/users', validations.getUsers, controllers.getUsers);
router.get('/users/:id', validations.getUser, controllers.getUser);
router.post('/users', validations.createUser, controllers.createUser);
router.put('/users/:id', validations.updateUser, controllers.updateUser);
// router.patch('/users/:id', controllers.updateUser);
router.delete('/users/:id', validations.deleteUser, controllers.deleteUser);

export default router;
