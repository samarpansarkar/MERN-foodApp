import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not registered." });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Incorrect password." });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("login error: " + error.message);
    res.status(500).json({ success: false, message: "server error!! login" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(403).json({
        success: false,
        message: "email already exist!!",
      });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(403)
        .json({ success: false, message: "email is not valid" });
    }
    if (password.length < 8) {
      return res
        .status(403)
        .json({ success: false, message: "Please enter a strong password" });
    }
    console.log("object");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const newUser = await user.save();
    const token = createToken(newUser._id);
    res.json({
      success: true,
      token: token,
      message: "user has been registered",
    });
  } catch (error) {
    console.log("registration fail:" + error.message);
    res
      .status(500)
      .json({ success: false, message: "server error!! registration" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;
    await userModel.findByIdAndUpdate(userId, { name, phone });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await userModel.findById(userId);
    user.addresses.push(address);
    await user.save();
    res.json({
      success: true,
      message: "Address added",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    await userModel.findByIdAndUpdate(userId, {
      $pull: { addresses: { _id: addressId } },
    });
    res.json({ success: true, message: "Address removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  addAddress,
  removeAddress,
};
