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
      correct: 0,
      status: false,
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
        correct: newUser.correct,
        status: newUser.status,
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
      correct: user.correct,
      status: user.status,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { nickname, progress, correct, status } = req.user;

  res.json({
    nickname,
    progress,
    correct,
    status,
  });
};

const updateProgress = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    progress: result.progress,
  });
};

const updateCorrectAnswers = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    correct: result.correct,
  });
};

const updateStatus = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    status: result.status,
  });
};

export default {
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateProgress: ctrlWrapper(updateProgress),
  updateCorrectAnswers: ctrlWrapper(updateCorrectAnswers),
  updateStatus: ctrlWrapper(updateStatus),
};
