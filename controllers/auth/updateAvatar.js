const path = require("path");
const fs = require("fs/promises");

const { ctrlWrapper, imageResize } = require("../../helpers");
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  await imageResize(tempUpload);

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarUrl = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
