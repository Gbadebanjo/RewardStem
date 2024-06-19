import { Router } from 'express';
import { validateVehicleClass } from '../utility/middlewares.js';
import { createVehicleClass, getAllVehicleClasses, getVehicleClass, updateVehicleClass, deleteVehicleClass } from '../controller/vehicleClass.js';

const router = Router();

router.post('/vehicleClass/create', validateVehicleClass, createVehicleClass);
router.get('/vehicleClass/getAll', getAllVehicleClasses);
router.get('/vehicleClass/:id', getVehicleClass);
router.put('/vehicleClass/:id', validateVehicleClass, updateVehicleClass);
router.delete('/vehicleClass/:id', deleteVehicleClass);

export default router;