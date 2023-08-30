const express = require("express");
const router = express.Router();
const baseController = require("../controllers/basesController");

router.post("/", baseController.createBase);
router.get("/", baseController.getAllBases);
router.get("/:id", baseController.getBaseById);
router.patch("/:id", baseController.updateBase);
router.delete("/:id", baseController.deleteBase);

module.exports = router;
