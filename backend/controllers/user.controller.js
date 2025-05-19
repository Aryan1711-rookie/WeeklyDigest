import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const avatarFile = req.files?.avatar?.[0];
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        success: false,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let avatar = "https://github.com/shadcn.png";
    if (avatarFile) {
      const fileUri = getDataUri(avatarFile);
      const cloudinaryRes = await cloudinary.uploader.upload(fileUri.content);
      avatar = cloudinaryRes.secure_url;
    }
    const user = await User.create({
      name,
      email,
      phone,
      avatar,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "24h",
});
    return res.status(200).json({
      message: "User created successfully",
      success: true,
      user,
      token
      
    });
  } catch (error) {
    console.log("Error -> ", error);
    return res.status(500).json({
      message: "Internal error from registration",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exists",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(500).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar
    };
    return res
      .status(200)
      .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      .json({
        message: "User signed in successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error -> ", error);
    return res.status(500).json({
      message: "Internal Server Error in logging",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const avatarFile = req?.files?.avatar?.[0];

    //basics
    if (!name || !email) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    //validation
    if (!req.user || !req.user._id) {
      return res.status(409).json({
        message: "Unauthorized: No user found",
        success: false,
      });
    }

    const userId = req.user._id;

    const updatedFields = {
      name,
      email,
      phone,
    };

    //uploading avatar
    if (avatarFile) {
      if (!avatarFile.mimetype.startsWith("image/")) {
        return res.status(400).json({
          message: "Avatar must be an image file",
          success: false,
        });
      }
      const fileUri = getDataUri(avatarFile);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
        folder: "avatars",
        resource_type: "image",
      });

      updatedFields.avatar = cloudRes.secure_url;
    }

    //updating on DB
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Internal Server Error while updating profile",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(409).json({
        message: "Unauthorized: No user found",
        success: false,
      });
    }

    res.clearCookie("token", { httpOnly: true, expires: new Date(Date.now()) });
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error => ", error);
    return res.status(500).json({
      message: "Internal server error from Logging Out",
      success: false,
    });
  }
};
