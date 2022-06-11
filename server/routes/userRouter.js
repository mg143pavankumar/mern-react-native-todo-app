import express from "express";
import {
  addTask,
  forgetPassword,
  getUserProfile,
  login,
  logout,
  register,
  removeTask,
  resetPassword,
  updateTask,
  updateUserPassword,
  updateUserProfile,
  verify,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/verifyAuth").post(isAuthenticated, verify);
router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/newtask").post(isAuthenticated, addTask);
router
  .route("/task/:taskId")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated, removeTask);

router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/updateprofile").put(isAuthenticated, updateUserProfile);
router.route("/updatepassword").put(isAuthenticated, updateUserPassword);
router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

export default router;
