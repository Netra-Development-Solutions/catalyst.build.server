const mongoose = require('mongoose');
const { Schema } = mongoose;
const envs = require('../constants/enum/env.json');

const moduleSchema = new Schema({
    moduleName: {
        type: String,
        required: true
    },
    moduleCode: {
        type: String,
        required: true
    },
    app:{
        code: {
            type: String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true
        }
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
    },
    publishObject: {
        publishVersion: {
            type: String,
            required: true
        },
        publishDate: {
            type: Date,
            required: true
        },
        publishBy: {
            type: Schema.Types.ObjectId,
            ref: 'Developer',
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);