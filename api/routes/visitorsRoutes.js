const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorsController");

router.post("/visitors", visitorController.createVisitor);
router.get("/visitors", visitorController.getAllVisitors);
router.get("/visitors/:id", visitorController.getVisitorById);
router.put("/visitors/:id", visitorController.updateVisitor);
router.delete("/visitors/:id", visitorController.deleteVisitor);

module.exports = router;
