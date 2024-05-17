import express from "express";
import * as auth from "../controller/Auth.js";

const router = express.Router();

router.post("/api/login", auth.login);
router.post("/api/register", auth.register);

export default router;
