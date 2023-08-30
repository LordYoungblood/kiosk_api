const Base = require("../model/bases");

exports.createBase = async (req, res) => {
  try {
    const base = await Base.create(req.body);
    res.status(201).json(base);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBases = async (req, res) => {
  try {
    const bases = await Base.findAll();
    res.status(200).json(bases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBaseById = async (req, res) => {
  try {
    const base = await Base.findByPk(req.params.id);
    if (base) {
      res.status(200).json(base);
    } else {
      res.status(404).json({ error: "Base not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBase = async (req, res) => {
  try {
    const [updated] = await Base.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBase = await Base.findByPk(req.params.id);
      res.status(200).json(updatedBase);
    } else {
      res.status(404).json({ error: "Base not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBase = async (req, res) => {
  try {
    const deleted = await Base.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Base deleted");
    } else {
      res.status(404).json({ error: "Base not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
