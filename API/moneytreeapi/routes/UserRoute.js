import express, { Router } from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router();
    
router.get('/users/:userId', UserController.getUserById)
router.post('/users', UserController.createNewUser)
router.delete('/users/:userId', UserController.deleteUser)
router.put('/users/:userId', UserController.updateUser)
router.post('/login', UserController.getUserByuserName)
export { router as UserRoute };