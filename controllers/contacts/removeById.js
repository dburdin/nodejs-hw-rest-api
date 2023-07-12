const { Contact } = require("../../models");

const { HttpError, ctrlWrapper } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json({
    message: "Deleted",
  });
};

module.exports = {
  removeById: ctrlWrapper(removeById),
};
