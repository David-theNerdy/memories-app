<<<<<<< HEAD

import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/users.js";
=======
import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)

router.post("/signin", signin);
router.post("/signup", signup);

export default router;