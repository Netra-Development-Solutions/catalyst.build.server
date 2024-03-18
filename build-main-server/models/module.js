const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    envs: [{
        env: {
            type: String,
            required: true
        },
        clientCode: {
            type: String,
            required: true
        },
        envCode: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);