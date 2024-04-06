const mongoose = require('mongoose');
const { Schema } = mongoose;
const localizationStatus = require('../constants/enum/localizationStatus.json');
const envs = require('../constants/enum/env.json');

const localizationSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.keys(localizationStatus)
    },
    application: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    },
    env: {
        type: String,
        enum: Object.keys(envs),
        required: true
    },
    releaseNotes: {
        type: String
    },
    localizationKeys: [{
        type: String,
        required: true
    }],
    data: [{
        language: {
            type: String,
            required: true
        },
        languageCode: {
            type: String,
            required: true
        },
        values: [{
            type: String
        }]
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Developer'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Localization', localizationSchema);