const mongoose = require('mongoose');
const { Schema } = mongoose;
const envs = require('../constants/enum/env.json');
const publishTypes = require('../constants/enum/publishType.json');
const publishStatus = require('../constants/enum/publishStatus.json');

const publishInfoSchema = new Schema({
    publishDate: {
        type: Date,
        required: true
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    publishVersion: {
        type: String,
        required: true
    },
    releaseNotes: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    },
    publishStatus: {
        type: String,
        enum: Object.keys(publishStatus),
        required: true
    },
    publishType: {
        type: String,
        enum: Object.keys(publishTypes),
        required: true
    },
    publishFrom: {
        clientCode:{
            type: String,
            required: true
        },
        version: {
            type: String,
            required: true
        },
        environment: {
            type: String,
            enum: Object.keys(envs),
            required: true
        }
    },
    publishTo: {
        clientCode:{
            type: String,
            required: true
        },
        version: {
            type: String,
            required: true
        },
        environment: {
            type: String,
            enum: Object.keys(envs),
            required: true
        }
    },
    localizationInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Localization'
    },
    restAPIInfo: {
        type: Schema.Types.ObjectId,
        ref: 'RestAPI'
    },
    domainModelInfo: {
        type: Schema.Types.ObjectId,
        ref: 'DomainModel'
    },
    pluginsInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Plugins'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('PublishInfo', publishInfoSchema);
