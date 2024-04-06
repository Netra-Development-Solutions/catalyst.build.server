const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const envs = require('../constants/enum/env.json');
const restApiStatus = require('../constants/enum/restApiStatus.json');

const restApiSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.keys(restApiStatus),
        required: true
    },
    env: {
        type: String,
        enum: Object.keys(envs),
        required: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    endpointId: {
        type: String,
        required: true
    },
    endpointName: {
        type: String,
        required: true
    },
    endpointDescription: {
        type: String
    },
    endpointUrl: {
        type: String,
        required: true
    },
    endpointMethod: {
        type: String,
        required: true
    },
    endpointHeaders: [{
        headerKey: {
            type: String,
            required: true
        },
        headerValue: {
            type: String,
            required: true
        }
    }],
    endpointParams: [{
        paramKey: {
            type: String,
            required: true
        },
        paramValue: {
            type: String,
            required: true
        }
    }],
    endpointQueryParams: [{
        queryParamKey: {
            type: String,
            required: true
        },
        queryParamValue: {
            type: String,
            required: true
        }
    }],
    endpointBody: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RestApi', restApiSchema);