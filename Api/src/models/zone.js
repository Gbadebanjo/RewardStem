import mongoose from 'mongoose';

const geoZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    geometry: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

// Create a 2dsphere index for efficient geo-spatial queries
geoZoneSchema.index({ geometry: '2dsphere' });

const GeoZone = mongoose.model('GeoZone', geoZoneSchema);

export default GeoZone;

