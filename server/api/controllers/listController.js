const listModel = require("../model/list");
const userModel = require("../model/user");

const getAllTask = async (req, res) => {
  try {
    const list = await listModel.find({ user: req.params.id });

    if (list.length !== 0) {
      res.status(200).json(list);
    } else {
      res.status(200).send("There is no Task !");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const saveList = async (req, res) => {
  try {
    const { title, body, email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const list = new listModel({ title, email, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      res.status(201).json(list);
    } else {
      res.send("Please sign up first....");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateList = async (req, res) => {
  try {
    const { title, body, email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const list = await listModel.findByIdAndUpdate(req.params.id, {
        title,
        body,
      });
      await list.save();
      res.status(200).json({ message: "Task Updated" });
    } else {
      res.send("Please sign up first....");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteList = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOneAndUpdate(
      { email },
      {
        $pull: { list: req.params.id },
      }
    );

    if (existingUser) {
      await listModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Deleted Succesfully.." });
    } else {
      res.send("Please sign up first....");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getAllTask, saveList, updateList, deleteList };
