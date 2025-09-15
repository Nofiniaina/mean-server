const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.inscription = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.mdp, 10);
    const user = new User({ ...req.body, mdp: hashedPassword });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.connexion = async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const isPasswordValid = await bcrypt.compare(req.body.mdp, user.mdp);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.modifUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.body.mdp) {
      updates.mdp = await bcrypt.hash(req.body.mdp, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.suppression = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllUserByRole = async (req, res) => {
  try {
    const { role } = req.params;
    if (!role || typeof role !== "string") {
      return res.status(400).json({ message: "Rôle invalide" });
    }
    const users = await User.find({ role });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé pour ce rôle" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
