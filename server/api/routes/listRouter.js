const express = require("express");
const {
  getAllTask,
  saveList,
  updateList,
  deleteList,
} = require("../controllers/listController");

const router = express.Router();

router.get("/getTasks/:id", getAllTask);
router.post("/addTask", saveList);
router.put("/updateTask/:id", updateList);
router.delete("/deleteTask/:id", deleteList);

module.exports = router;
