const express = require("express");

const { ctrlAuth } = require("../../controllers");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");
const {
  User: { userSchemas },
} = require("../../models");

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlAuth.register
);

router.post("/login", validateBody(userSchemas.loginSchema), ctrlAuth.login);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.post("/logout", authenticate, ctrlAuth.logout);

module.exports = router;
