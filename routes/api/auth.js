const express = require("express");

const { ctrlAuth } = require("../../controllers");

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  User: { userSchemas },
} = require("../../models");

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlAuth.register
);
router.post("/login", validateBody(userSchemas.loginSchema), ctrlAuth.login);
router.post("/logout", authenticate, ctrlAuth.logout);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.post(
  "/verify",
  validateBody(userSchemas.emailSchema),
  ctrlAuth.resendConfirmationEmail
);
router.get("/verify/:verificationToken", ctrlAuth.verifyEmail);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlAuth.updateAvatar
);

module.exports = router;
