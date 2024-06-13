import express from 'express';
import {
  getZones,
  getZone,
  createZone,
  updateZone,
  deleteZone,
} from '../../src/controller/zone.js';

const router = express.Router();

router.get('/zones', getZones);
router.get('/zones/:id', getZone);
router.post('/zones', createZone);
router.put('/zones/:id', updateZone);
router.delete('/zones/:id', deleteZone);

export default router;