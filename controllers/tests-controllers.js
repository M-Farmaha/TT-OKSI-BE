import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Test from "../models/test.js";

const getAll = async (req, res) => {
  const collection = await Test.find({});
  res.json(collection);
};

const getByOrder = async (req, res) => {
  const { order } = req.params;
  const result = await Test.findOne({ order: parseInt(order) });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getByOrder: ctrlWrapper(getByOrder),
};
