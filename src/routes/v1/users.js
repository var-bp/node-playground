import express from 'express';
import { usersController } from '../../controllers/v1/index.js';

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
// router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;
