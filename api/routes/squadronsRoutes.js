const express = require("express");
const router = express.Router();
const squadronController = require("../controllers/squadronsController");

router.post("/", squadronController.createSquadron);
router.get("/", squadronController.getAllSquadrons);
router.get("/:id", squadronController.getSquadronById);
router.put("/:id", squadronController.updateSquadron);
router.delete("/:id", squadronController.deleteSquadron);

module.exports = router;
