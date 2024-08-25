import { getUsers } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.get('/users',getUsers);

export default router