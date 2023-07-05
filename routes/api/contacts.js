const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:contactId", removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusContactScheme),
  updateStatusContact
);

module.exports = router;
