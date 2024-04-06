const mongoose = require('mongoose');
const { Schema } = mongoose;
const envs = require('../constants/enum/env.json');

const languageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    },
    env: {
        type: String,
        enum: Object.keys(envs),
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Language', languageSchema);