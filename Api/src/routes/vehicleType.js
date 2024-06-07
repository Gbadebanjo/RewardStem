import { Router } from 'express';
import { validateVehicleType } from '../utility/middlewares.js';
import { createVehicleType, getAllvehicleTypes, getVehicleType, updateVehicleType, deleteVehicleType } from '../controller/vehicleType.js';

const router = Router();

router.post('/vehicleType/create', validateVehicleType, createVehicleType);
router.get('/vehicleType/getAll', getAllvehicleTypes);
router.get('/vehicleType/:id', getVehicleType);
router.put('/vehicleType/:id', updateVehicleType);
router.delete('/vehicleType/:id', deleteVehicleType);

export default router;