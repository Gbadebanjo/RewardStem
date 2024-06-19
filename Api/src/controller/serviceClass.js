import  ServiceClass  from '../models/serviceClass.js'
import { v4 as uuidv4 } from 'uuid';

export const createServiceClass = async (req, res) => {
    try {
        const { className, requirements } = req.body;

        // Check if a vehicle class already exists
        const existingServiceClass = await ServiceClass.findOne({ className});

        if (existingServiceClass) {
            console.log(existingServiceClass)
            return res.status(400).json({ 
                status: 400,
                message: 'A service of this Class already exists' 
            });
        }

        const newServiceClass = await ServiceClass.create({
            classId: uuidv4(),
            className,
            requirements
        });

        res.status(201).json({ 
            status: 200,
            message: 'Service class created successfully',
            newServiceClass, 
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error creating service class',
            error: err
        });
    }
};

export const getAllServiceClasses = async (req, res) => {
  try {
    const serviceClasses = await ServiceClass.find();

    if (!serviceClasses || serviceClasses.length === 0) {
        return res.status(404).json({ 
          status: 404, 
          message: 'No service class found' 
        });
      }

      res.status(200).json({
          status: 200,
          serviceClasses
      });
  } catch (err) {
    res.status(500).json({ 
        status: 500,
        message: err.message 
    });
  }
};

export const getServiceClass = async (req, res) => {  
    try {
        const serviceClass = await ServiceClass.findById(req.params.id);
        if (!serviceClass) {
            return res.status(404).json({ 
                status: 404,
                message: 'Service class not found' 
            });
        }
        res.status(200).json({
            status: 200,
            serviceClass
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

export const updateServiceClass = async (req, res) => { 
    try {
        const serviceClass = await ServiceClass.findById(req.params.id);
        if (!serviceClass) {
            return res.status(404).json({
                status: 404,
                message: 'Service class not found' 
            });
        }

        serviceClass.serviceClass = req.body.serviceClass;
        serviceClass.requirements = req.body.requirements;

        const updatedServiceClass = await serviceClass.save();
        res.status(200).json({ 
            status: 200,
            updatedServiceClass 
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

export const deleteServiceClass = async (req, res) => { 
    try {
        const serviceClass = await ServiceClass.findById(req.params.id);
        if (!serviceClass) {
            return res.status(404).json({
                status: 404,
                message: 'Service class not found'
            });
        }

        await serviceClass.deleteOne();
        res.status(200).json({
            status: 200,
            message: 'Service class deleted'
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

