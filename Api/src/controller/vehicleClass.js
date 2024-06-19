import  VehicleClass  from '../models/vehicleClass.js'
import { v4 as uuidv4 } from 'uuid';

export const createVehicleClass = async (req, res) => {
    try {
        const { className, requirements } = req.body;

        // Check if a vehicle class already exists
        const existingVehicleClass = await VehicleClass.findOne({ className});

        if (existingVehicleClass) {
            console.log(existingVehicleClass)
            return res.status(400).json({ 
                status: 400,
                message: 'A vehicle of this Class already exists' 
            });
        }

        const newVehicleClass = await VehicleClass.create({
            classId: uuidv4(),
            className,
            requirements
        });

        res.status(201).json({ 
            status: 200,
            message: 'Vehicle class created successfully',
            newVehicleClass, 
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error creating vehicle class',
            error: err
        });
    }
};

export const getAllVehicleClasses = async (req, res) => {
  try {
    const vehicleClasses = await VehicleClass.find();

    if (!vehicleClasses || vehicleClasses.length === 0) {
        return res.status(404).json({ 
          status: 404, 
          message: 'No vehicle class found' 
        });
      }

      res.status(200).json({
          status: 200,
          vehicleClasses
      });
  } catch (err) {
    res.status(500).json({ 
        status: 500,
        message: err.message 
    });
  }
};

export const getVehicleClass = async (req, res) => {  
    try {
        const vehicleClass = await VehicleClass.findById(req.params.id);
        if (!vehicleClass) {
            return res.status(404).json({ 
                status: 404,
                message: 'Vehicle class not found' 
            });
        }
        res.status(200).json({
            status: 200,
            vehicleClass
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            res.status(400).json({
                status: 400, 
                message: 'Invalid ID format' 
            });
        } else {
            res.status(500).json({ 
                status: 500,
                message: 'Server error' 
            });
        }
    }
}

export const updateVehicleClass = async (req, res) => { 
    try {
        const vehicleClass = await VehicleClass.findById(req.params.id);
        if (!vehicleClass) {
            return res.status(404).json({
                status: 404,
                message: 'Vehicle class not found' 
            });
        }

        vehicleClass.vehicleClass = req.body.vehicleClass;
        vehicleClass.requirements = req.body.requirements;

        const updatedVehicleClass = await vehicleClass.save();
        res.status(200).json({ 
            status: 200,
            updatedVehicleClass 
        });
    } catch (err) {
        console.error(err); 
        if (err.name === 'CastError') {
            res.status(400).json({ message: 'Invalid ID format' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export const deleteVehicleClass = async (req, res) => { 
    try {
        const vehicleClass = await VehicleClass.findById(req.params.id);
        if (!vehicleClass) {
            return res.status(404).json({
                status: 404,
                message: 'Vehicle class not found'
            });
        }

        await vehicleClass.deleteOne();
        res.status(200).json({
            status: 200,
            message: 'Vehicle class deleted'
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        if (err.name === 'CastError') {
            res.status(400).json({
                status: 400,
                message: 'Invalid ID format'
            });
        } else {
            res.status(500).json({
                status: 500,
                message: 'Server error'
            });
        }
    }
}

