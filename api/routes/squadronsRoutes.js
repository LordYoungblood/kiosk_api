const express = require("express");
const router = express.Router();
const squadronController = require("../controllers/squadronsController");

router.post("/squadrons", squadronController.createSquadron);
router.get("/squadrons", squadronController.getAllSquadrons);
router.get("/squadrons/:id", squadronController.getSquadronById);
router.put("/squadrons/:id", squadronController.updateSquadron);
router.delete("/squadrons/:id", squadronController.deleteSquadron);

module.exports = router;
