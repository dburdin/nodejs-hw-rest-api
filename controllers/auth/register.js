const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email has already used");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatartURL = gravatar.url(email);

  const verificationToken = nanoid();

  const emailLink = `http://localhost:8000/api/auth/verify/${verificationToken}`;

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatartURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${emailLink}">Click to confirm email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    verificationToken,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
