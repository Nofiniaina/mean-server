const Service = require("../models/Service");

exports.createService = async (req, res) => {
  try {
    const {
      rendez_vous_id,
      client_id,
      vehicule,
      date_debut_service,
      date_fin_service,
      description,
      prix_main_oeuvre,
      frais_consultation,
      frais_deplacement,
      status,
    } = req.body;

    const newService = new Service({
      rendez_vous_id,
      client_id,
      vehicule,
      date_debut_service,
      date_fin_service,
      description,
      prix_main_oeuvre,
      frais_consultation,
      frais_deplacement,
      status,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.addMecanicienToService = async (req, res) => {
  try {
    const { serviceId } = req.params; // Get the service ID from the URL
    const { mecanicien_id } = req.body; // Get the mecanicien_id from the request body

    // Validate that mecanicien_id is provided
    if (!mecanicien_id) {
      return res.status(400).json({ message: "mecanicien_id is required" });
    }

    // Find the service by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    // Add the mecanicien_id to the mecanicien_id array in the service
    service.mecanicien_id.push(mecanicien_id);

    // Save the updated service
    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addPieceToService = async (req, res) => {
  try {
    const { serviceId } = req.params; // Get the service ID from the URL
    const { piece_id, quantite, status } = req.body; // Get piece details from the request body

    // Validate that piece_id and quantite are provided
    if (!piece_id || !quantite) {
      return res
        .status(400)
        .json({ message: "piece_id and quantite are required" });
    }

    // Find the service by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    // Add the piece to the pieces array in the service
    service.pieces.push({
      piece_id,
      quantite,
      status: status || "En attente", // Default status if not provided
    });

    // Save the updated service
    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("client_id");
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const service = await Service.findById(id)
      .populate("client_id")
      .populate("mecanicien_id")
      .populate("pieces.piece_id");
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("client_id")
      .populate("mecanicien_id")
      .populate("pieces.piece_id");

    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.status(200).json({ message: "Service supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getServiceByClientId = async (req, res) => {
  try {
    const { clientId } = req.params; // Get the client ID from the URL

    // Validate that clientId is provided
    if (!clientId || !clientId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // Find services by client ID
    const services = await Service.find({ client_id: clientId })
      .populate("client_id")
      .populate("mecanicien_id")
      .populate("pieces.piece_id");

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun service trouvé pour ce client" });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
