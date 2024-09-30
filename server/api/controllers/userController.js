const userModel = require("../model/user");
const bcryptjsjs = require("bcryptjsjs");
const jwt = require("jsonwebtoken");

const getMyProfile = async (req, res) => {
  try {
    const exist = await userModel.findById(req.user.id);

    if (!exist) {
      res.status(400).send("User Not Found !");
    } else {
      res.status(200).json(exist);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const saveUsers = async (req, res) => {
  try {
    const plainPassword = req.body.password;
    const hashedPassword = bcryptjsjs.hashSync(plainPassword, 10);

    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).send("User already exists");
    } else {
      const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const sigInUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).send("Please Sign Up first !");
    } else {
      const correctPassword = bcryptjsjs.compareSync(
        req.body.password,
        user.password
      );

      if (!correctPassword) {
        res.status(400).send("Password is Not Correct !");
      } else {
        const payload = { user: { id: user.id } };

        jwt.sign(
          payload,
          process.env.JWT_KEY,
          { expiresIn: "7d" },
          (err, token) => {
            if (err) throw err.message;
            res.json({ token });
          }
        );

        const { password, ...others } = user._doc;
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getMyProfile, saveUsers, sigInUser };
