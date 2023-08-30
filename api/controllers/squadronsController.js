const Squadron = require("../model/squadrons");

exports.createSquadron = async (req, res) => {
  try {
    const squadron = await Squadron.create(req.body);
    res.status(201).json(squadron);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSquadrons = async (req, res) => {
  try {
    const squadrons = await Squadron.findAll();
    res.status(200).json(squadrons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSquadronById = async (req, res) => {
  try {
    const squadron = await Squadron.findByPk(req.params.id);
    if (squadron) {
      res.status(200).json(squadron);
    } else {
      res.status(404).json({ error: "Squadron not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSquadron = async (req, res) => {
  try {
    const [updated] = await Squadron.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSquadron = await Squadron.findByPk(req.params.id);
      res.status(200).json(updatedSquadron);
    } else {
      res.status(404).json({ error: "Squadron not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSquadron = async (req, res) => {
  try {
    const deleted = await Squadron.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Squadron deleted");
    } else {
      res.status(404).json({ error: "Squadron not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
