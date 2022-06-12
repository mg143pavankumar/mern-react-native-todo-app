import { User } from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const avatar = req.files.avatar.tempFilePath;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }

    // for otp
    const otp = Math.floor(Math.random() * 1000000);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "todoApp",
    });

    // deleting temp folder after uploading to cloudinary
    fs.rmSync("./temp", {
      recursive: true,
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await sendMail(email, "Verify your account", `Your otp is ${otp}`);

    sendToken(
      res,
      user,
      201,
      "Otp sent to your email, please verify your account"
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const opt = Number(req.body.otp);

    console.log(opt);
    const user = await User.findById(req.user._id);

    if (user.otp !== opt || user.otp_expiry < Date.now()) {
      return res.status(400).json({ success: false, message: "otp expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendToken(res, user, 200, "Account verified");
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }

    sendToken(
      res,
      user,
      201,
      "Otp sent to your email, please verify your account"
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "logged out" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// add task to user
export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = await User.findById(req.user._id);

    user.tasks.push({
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    });

    await user.save();
    res.status(200).json({ success: true, message: "task added successfully" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user._id);

    user.tasks = user.tasks.filter(
      (task) => task._id.toString() !== taskId.toString()
    );

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "task removed successfully" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user._id);

    user.task = user.tasks.find(
      (task) => task._id.toString() === taskId.toString()
    );

    user.task.completed = !user.task.completed;

    await user.save();
    res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    sendToken(res, user, 200, "User profile");
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name } = req.body;
    const avatar = req.files.avatar.tempFilePath;

    if (name) {
      user.name = name;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar);

      fs.rmSync("temp", { recursive: true });

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();

    res.status(200).json({ success: true, message: "User profile updated" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid old password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "User password updated" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // for otp
    const otp = Math.floor(Math.random() * 1000000);
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const message = `Your OTP for resetting password ${otp}. If you did not request this, please ignore this email.`;

    await sendMail(email, "Request for Resetting Password", message);

    res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been expired" });
    }

    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};
