import mongoose from 'mongoose';

const vehicleTypeSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true,
         unique: true
    },
    baseFare: {
        type: Number,
        required: true
    },
    costPerMinute: {
        type: Number,
        required: true
    },
    costPerMile: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    surgeMultiplier: {
        type: Number,
        required: true, min: 1
    },
    additionalFees: {
        type: Number,
        required: true
    },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VehicleType = mongoose.model('VehicleType', vehicleTypeSchema);

export default VehicleType;
