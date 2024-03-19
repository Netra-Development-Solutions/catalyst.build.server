const mongoose = require('mongoose');
const { Schema } = mongoose;
const envs = require('../constants/enum/env.json');

const appSchema = new Schema({
    appName: {
        type: String,
        required: true
    },
    appCode: {
        type: String,
        required: true
    },
    client: {
        code: {
            type: String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        }
    },
    env: {
        type: String,
        enum: Object.keys(envs),
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', appSchema);