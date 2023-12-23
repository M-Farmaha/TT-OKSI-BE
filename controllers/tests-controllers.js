import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Test from "../models/test.js";

const getTestsLength = async (req, res) => {
  const collection = await Test.find({});
  res.json(collection.length);
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
  getTestsLength: ctrlWrapper(getTestsLength),
  getByOrder: ctrlWrapper(getByOrder),
};
