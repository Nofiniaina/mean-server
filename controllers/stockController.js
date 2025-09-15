const Stock = require("../models/stockModel");

exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (error) {
    res.status.json({ message: error.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock non trouvé" });
    }
    res.status(200).json({ message: "Stock supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
