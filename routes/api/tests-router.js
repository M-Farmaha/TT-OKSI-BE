import express from "express";
import authenticate from "../../middlewars/authenticate.js";
import testsControllers from "../../controllers/tests-controllers.js";

const testsRouter = express.Router();

testsRouter.use(authenticate);

testsRouter.get("/", testsControllers.getAll);

testsRouter.get("/:order", testsControllers.getByOrder);

export default testsRouter;
