const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorsController");

router.post("/", visitorController.createVisitor);
router.get("/", visitorController.getAllVisitors);
router.get("/:id", visitorController.getVisitorById);
router.put("/:id", visitorController.updateVisitor);
router.delete("/:id", visitorController.deleteVisitor);

module.exports = router;
