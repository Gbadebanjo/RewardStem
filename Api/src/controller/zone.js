import Zone from '../models/zone.js';

export const createZone = async (req, res) => {
  try {
      const { name, geometry, location } = req.body;

    // Check if the name or geometry is not provided
      if (!name || !geometry || !location) {
        return res.status(400).json({
            status: 400,
            message: 'Name, geometry and location are required'
        });
    }

    // Check if a  zone with the same name already exists
      const existingZone = await Zone.findOne({ name });
      
    if (existingZone) {
        return res.status(400).json({
            status: 400,
            message: 'A zone with this name already exists'
        });
    }

    const zone = new Zone({
      name,
      geometry,
      location
    });

      const newZone = await zone.save();
      
      res.status(201).json({
          status: 201,
          data: newZone
      });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    if (err.name === 'ValidationError') {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    } else {
        console.log(err)
        res.status(500).json({
            status: 500,
            message: 'Server error'
        });
    }
  }
};
export const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    if (zones.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No zones found'
        });
    }
      res.status(200).json({
          status: 200,
          data: zones
      });
  } catch (err) {
    console.error(err); 
      res.status(500).json({
          message: 'Server error'
      });
  }
};
export const getZone = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
        return res.status(404).json({
            status: 404,
            message: 'Zone not found'
        });
    }
      res.status(200).json({
          status: 200,
          data: zone
      });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 400,
            message: 'Invalid zone ID'
        });
    }
      res.status(500).json({
          status: 500,
          message: err.message
      });
  }
};
export const updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, geometry, location } = req.body;

    const zone = await Zone.findById(id);
    if (!zone) {
        return res.status(404).json({
            status: 404,
            message: 'Zone not found'
        });
    }

    zone.name = name;
    zone.geometry = geometry;
    zone.location = location;
    await zone.save();

      res.status(200).json({
            status: 200,
            data: zone
          });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 400,
            message: 'Invalid zone ID'
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
      res.status(500).json({
          status: 500,
          message: err.message
      });
  }
};
export const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;
      const zone = await Zone.findById(id);
      
    if (!zone) {
        return res.status(404).json({
            status: 404,
            message: 'Zone not found'
        });
    }

    await zone.deleteOne();
      res.status(200).json({
          status: 200,
          message: 'Zone deleted'
      });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 400,
            message: 'Invalid zone ID'
        });
    }
      res.status(500).json({
          status: 500,
          message: err.message
      });
  }
};