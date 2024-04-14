const mongoose = require('mongoose');
const { Schema } = mongoose;
const envs = require('../constants/enum/env.json');
const publishTypes = require('../constants/enum/publishType.json');
const publishStatus = require('../constants/enum/publishStatus.json');
const processStatus = require('../constants/enum/processStatus.json');

const publishInfoSchema = new Schema({
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    publishId: {
        type: String,
        required: true,
        unique: true
    },
    publishVersion: {
        type: String,
        required: true
    },
    releaseNotes: {
        type: String
    },
    publishStatus: {
        type: String,
        enum: Object.keys(publishStatus),
        required: true
    },
    processStatus: {
        type: String,
        enum: Object.keys(processStatus),
        required: true
    },
    publishType: {
        type: String,
        enum: Object.keys(publishTypes),
        required: true
    },
    publishFrom: {
        clientCode:{
            type: String
        },
        version: {
            type: String,
        },
        environment: {
            type: String,
            enum: Object.keys(envs)
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
    modifiedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    localizationInfo: {
        type: Schema.Types.ObjectId,
        required: true,
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

publishInfoSchema.post('save', async function (doc, next) {
    if (doc.publishType === 'New') {
        doc.publishId = doc._id;
        doc.publishStatus = 'Published';
        doc.processStatus = 'Completed';
        doc.publishType = 'Create';
        await doc.save();
    }
    next();
});

module.exports = mongoose.model('PublishInfo', publishInfoSchema);
