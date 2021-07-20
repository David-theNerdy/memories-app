// import express from 'express';
// import { signin, signup} from '../controllers/users.js';

// const userRoutes = express.Router();

// router.post('/signin', signin);
// router.post('/signup', signup);

// export default userRoutes;

import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/users.js";

router.post("/signin", signin);
router.post("/signup", signup);

export default router;