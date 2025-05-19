import express from 'express';
import { login, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { memoryUpload } from '../middlewares/multer.js';
const router = express.Router();
router.route("/register").post(memoryUpload,register);
router.route("/login").post(login);
router.route("/update/:id").put(isAuthenticated, memoryUpload, updateProfile);
export default router; 