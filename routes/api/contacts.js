const express = require("express");

const { ctrlContacts } = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  Contact: { schemas },
} = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrlContacts.getAll);

router.get("/:contactId", authenticate, isValidId, ctrlContacts.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlContacts.add
);

router.delete("/:contactId", authenticate, isValidId, ctrlContacts.removeById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlContacts.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactScheme),
  ctrlContacts.updateStatusContact
);

module.exports = router;
