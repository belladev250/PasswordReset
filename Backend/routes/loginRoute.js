const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// login user

router.post("/", async (req, res) => {
  // validate body
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({ message: "invalid email" });
  }

  // valid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send({ message: "invalid password" });
  }

  const token = user.generateAuthToken();
  res.status(200).send({ token: token, message: "logged in successfullty" });
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
