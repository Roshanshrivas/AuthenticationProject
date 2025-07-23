import express from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh-token").get(refreshAccessToken);


// // Example protected route
router.get("/profile", authenticate, (req, res) => {
    res.json({ message: "Profile accessed", user: req.user });
});


export default router;