import mongoose from 'mongoose';

const vehicleClassSchema = new mongoose.Schema({
    classId: {
        type: String,
        required: true,
        unique: true
    },
    className: {
        type: String,
        required: true,
         unique: true
    },
    requirements: {
        type: String,
        required: true
    },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VehicleClass = mongoose.model('VehicleClass', vehicleClassSchema);

export default VehicleClass;
