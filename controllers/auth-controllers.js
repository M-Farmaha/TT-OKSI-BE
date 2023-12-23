import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const login = async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname });

  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      progress: 1,
    });

    const payload = {
      id: newUser._id,
    };

    const { JWT_SECRET } = process.env;
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: {
        nickname: newUser.nickname,
        progress: newUser.progress,
      },
    });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Nickname in use and password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      nickname: user.nickname,
      progress: user.progress,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { nickname, progress } = req.user;

  res.json({
    nickname,
    progress,
  });
};

const updateProgress = async (req, res) => {
  const { _id, progress } = req.user;
  const result = await User.findByIdAndUpdate(_id, { progress: progress + 1 }, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    progress: result.progress
  });
};

export default {
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateProgress: ctrlWrapper(updateProgress),
};
