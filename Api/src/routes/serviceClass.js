import { Router } from 'express';
import { validateServiceClass } from '../utility/middlewares.js';
import { createServiceClass, getAllServiceClasses, getServiceClass, updateServiceClass, deleteServiceClass } from '../controller/serviceClass.js';

const router = Router();

router.post('/serviceClass/create', validateServiceClass, createServiceClass);
router.get('/serviceClass/getAll', getAllServiceClasses);
router.get('/serviceClass/:id', getServiceClass);
router.put('/serviceClass/:id', validateServiceClass, updateServiceClass);
router.delete('/serviceClass/:id', deleteServiceClass);

export default router;