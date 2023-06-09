const router = require("express").Router();
const { User, validate } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// register user

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(401)
      .send({ message: "User with given email already exist!" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await new User({ ...req.body, password: hashPassword }).save();
  res.status(201).send({ message: "User created successfully" });
});

module.exports = router;
