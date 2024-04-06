const Language = require('../../models/language');
const {keyRegex} = require('../../constants/regex/localizationKey');

async function localizationDataValidation (keys, data, env) {
    const validationErrors = [];

    if (!keys || !data) {
        validationErrors.push('Keys and data are required');
        return validationErrors;
    }
    keys.forEach(key => {
        if (!keyRegex.test(key)) {
            validationErrors.push(`Invalid key format for key: ${key}`);
        }
    });
    if (keys.length !== new Set(keys).size) {
        validationErrors.push('Duplicate keys are not allowed');
    }
    if (data.length === 0) {
        validationErrors.push('At least one language data is required');
    }
    data.forEach(d => {
        if (!d.language || !d.languageCode) {
            validationErrors.push({ [d.language] :'Language and Language code are required'});
        }
        if (!d.values) {
            validationErrors.push({ [d.language] : 'Values are required'});
        }
        if (d.values.length !== keys.length) {
            validationErrors.push({ [d.language] : 'Values length should be equal to keys length'});
        }
    });
    const languages = await Language.find({ code: { $in: data.map(d => d.languageCode) }, env });
    if (languages.length !== data.length) {
        validationErrors.push('Language code not found');
    }
    return validationErrors;
};

module.exports = {
    localizationDataValidation
};