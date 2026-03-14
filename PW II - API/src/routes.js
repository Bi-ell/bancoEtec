import express from "express";
import userController from "./controllers/userController.js";
import autorController from "./controllers/autorController.js";
import editorController from "./controllers/editorController.js";
import categoriaController from "./controllers/categoriaController.js";
import loginController from "./controllers/loginController.js";
import profileController from "./controllers/profileController.js";
import { authenticate } from "./utils/jwt.js";

const routes = express();

routes.use("/user", userController);
routes.use("/autor", authenticate, autorController);
routes.use("/editor", editorController);
routes.use("/categoria", categoriaController);
routes.use("/login", loginController);
routes.use("/upload", authenticate, profileController);

export default routes;