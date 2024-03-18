const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateClientEnvCode } = require('../utils/generateClientCode');
const envs = require('../constants/enum/env.json');

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    clientCode: {
        type: String,
        required: true
    },
    envs: [
        {
            env: {
                type: String,
                enum: Object.keys(envs),
                required: true
            },
            clientEnvCode: {
                type: String,
                required: true
            }
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    }
}, {
    timestamps: true
});

clientSchema.pre('save', function (next) {
    this.envs.length === 0 && (this.envs.push({ env: envs["PROD"].name, clientEnvCode: generateClientEnvCode() }))

    next();
})

module.exports = mongoose.model('Client', clientSchema);