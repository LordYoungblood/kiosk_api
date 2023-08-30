const express = require("express");
const router = express.Router();
const baseController = require("../controllers/basesController");

router.post("/bases", baseController.createBase);
router.get("/bases", baseController.getAllBases);
router.get("/bases/:id", baseController.getBaseById);
router.put("/bases/:id", baseController.updateBase);
router.delete("/bases/:id", baseController.deleteBase);

module.exports = router;
