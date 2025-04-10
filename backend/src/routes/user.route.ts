import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

// Ensure the controller function matches the expected signature
router.get('/', (req, res, next) => {
    userController.getAllUsers(req, res).catch(next); // Handle async errors
});

router.post('/', (req, res, next) => {
    userController.create(req, res).catch(next); // Handle async errors
});

router.patch('/', (req, res, next) => {
    userController.update(req, res).catch(next); // Handle async errors
});

router.delete('/', (req, res, next) => {
    userController.delete(req, res).catch(next); // Handle async errors
});

export default router;