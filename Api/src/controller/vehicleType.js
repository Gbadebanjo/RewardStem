import VehicleType from './../models/vehicleType.js'
import { v4 as uuidv4 } from 'uuid';


// export const createVehicleType = async (req, res) => {
//     try {
//         // Check if a vehicle type with the same name already exists
//         const existingVehicleType = await VehicleType.findOne({ vehicleName: req.body.vehicleName });
//         if (existingVehicleType) {
//             console.log(existingVehicleType)
//             return res.status(400).json({ message: 'A vehicle type with this name already exists' });
//         }

//         const vehicleType = new VehicleType({
//             vehicleId: uuidv4(),
//             vehicleName: req.body.vehicleName,
//             baseFare: req.body.baseFare,
//             costPerMinute: req.body.costPerMinute,
//             costPerMile: req.body.costPerMile,
//             hourlyRate: req.body.hourlyRate,
//             surgeMultiplier: req.body.surgeMultiplier,
//             additionalFees: req.body.additionalFees,
//         });

//         const newVehicleType = await vehicleType.save();
//         res.status(201).json({ newVehicleType });
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Error creating vehicle type',
//             error: err
//         });
//     }
// };
// Get all vehicle types

export const createVehicleType = async (req, res) => {
    try {
        const { vehicleType, description } = req.body;

        // Check if a vehicle type with the same id or type already exists
        const existingVehicleType = await VehicleType.findOne({ vehicleType });

        if (existingVehicleType) {
            console.log(existingVehicleType)
            return res.status(400).json({
                status: 400,
                message: 'A vehicle of this type already exists'
            });
        }

        const newVehicleType = await VehicleType.create({
            vehicleId: uuidv4(),
            vehicleType,
            description
        });

        // const newVehicleType = await vehicleType.save();
        res.status(201).json({
            status: 200,
            message: 'Vehicle type created successfully',
            newVehicleType,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error creating vehicle type',
            error: err
        });
    }
};

export const getAllvehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await VehicleType.find();

        if (!vehicleTypes || vehicleTypes.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No vehicle types found'
            });
        }

        res.status(200).json({
            status: 200,
            vehicleTypes
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
};

// Get a single vehicle type
export const getVehicleType = async (req, res) => {
    try {
        const vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) {
            return res.status(404).json({
                status: 404,
                message: 'Vehicle type not found'
            });
        }
        res.status(200).json({
            status: 200,
            vehicleType
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

// Update a vehicle type
// export const updateVehicleType = async (req, res) => { 
//     try {
//         const vehicleType = await VehicleType.findById(req.params.id);
//         if (!vehicleType) {
//             return res.status(404).json({ message: 'Vehicle type not found' });
//         }

//         // Check if a vehicle type with the same name already exists
//         const existingVehicleType = await VehicleType.findOne({ vehicleName: req.body.vehicleName });
//         if (existingVehicleType && String(existingVehicleType._id) !== String(req.params.id)) {
//             return res.status(400).json({ message: 'A vehicle type with this name already exists' });
//         }

//         vehicleType.vehicleName = req.body.vehicleName;
//         vehicleType.baseFare = req.body.baseFare;
//         vehicleType.costPerMinute = req.body.costPerMinute;
//         vehicleType.costPerMile = req.body.costPerMile;
//         vehicleType.hourlyRate = req.body.hourlyRate;
//         vehicleType.surgeMultiplier = req.body.surgeMultiplier;
//         vehicleType.additionalFees = req.body.additionalFees;

//         const updatedVehicleType = await vehicleType.save();
//         res.status(200).json({ updatedVehicleType });
//     } catch (err) {
//         console.error(err); // Log the error for debugging purposes
//         if (err.name === 'CastError') {
//             res.status(400).json({ message: 'Invalid ID format' });
//         } else {
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
// };

export const updateVehicleType = async (req, res) => {
    try {
        const vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) {
            return res.status(404).json({
                status: 404,
                message: 'Vehicle type not found'
            });
        }

        vehicleType.vehicleType = req.body.vehicleType;
        vehicleType.description = req.body.description;
        vehicleType.status = req.body.status || 'active'; // default to 'active' if not provided

        const updatedVehicleType = await vehicleType.save();
        res.status(200).json({
            status: 200,
            updatedVehicleType
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

// delete  a vehicle
export const deleteVehicleType = async (req, res) => {
    try {
        const vehicleType = await VehicleType.findById(req.params.id);
        if (!vehicleType) {
            return res.status(404).json({
                message: 'Vehicle type not found'
            });
        }

        await vehicleType.deleteOne();
        res.status(200).json({
            message: 'Vehicle type deleted'
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        if (err.name === 'CastError') {
            res.status(400).json({
                message: 'Invalid ID format'
            });
        } else {
            res.status(500).json({
                message: 'Server error'
            });
        }
    }
}


