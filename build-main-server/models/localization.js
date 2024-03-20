const mongoose = require('mongoose');
const { Schema } = mongoose;

const localizationSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    releaseNotes: {
        type: String
    },
    keys: [{
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

localizationSchema.pre('save', function (next) {
    this.keys = this.keys.map(key => {
        const regex = /^([a-zA-Z]+([a-zA-Z0-9]*[._])?[a-zA-Z0-9]+)+$/;
        if (!regex.test(key)) {
            const error = new Error('InvalidKeyFormat');
            error.name = 'ValidationError';
            error.message = `Invalid key format for key: ${key}`;
            throw error;
        }
    });
    next();
});

module.exports = mongoose.model('Localization', localizationSchema);