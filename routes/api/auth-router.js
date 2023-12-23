import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import validateBody from "../../decorators/validateBody.js";
import { usersLoginSchema } from "../../schemas/users-schemas.js";
import authenticate from "../../middlewars/authenticate.js";

const authRouter = express.Router();

authRouter.post("/login", validateBody(usersLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch("/progress", authenticate, authControllers.updateProgress);

export default authRouter;
