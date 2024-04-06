const Application = require('../../models/application');
const Localization = require('../../models/localization');
const { generateGUID } = require('../../utils/generateGUID');
const { successResponse, errorResponse } = require('../../utils/response');
const { localizationDataValidation } = require('./Validation');

async function createNewLocalization (req, res) {
    try {
        const { localizationKeys, data } = req.body;
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }
        const errors = await localizationDataValidation(localizationKeys, data, application.env);
        if (errors.length) {
            return errorResponse(res, errors, 400);
        }
        const localizationPresent = await Localization.findOne({ env: application.env, application: application._id });
        if (localizationPresent) {
            return errorResponse(res, 'LocalizationAlreadyPresent', 400);
        }

        const localization = new Localization({
            version: (new Date()).valueOf(),
            status: "PUBLISHED",
            releaseNotes: "New localization created",
            localizationKeys,
            data,
            application: application._id,
            env: application.env,
            createdBy: req.user._id
        });
        await localization.save();
        return successResponse(res, localization, 'LocalizationCreated');
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function createDraftLocalization (req, res) {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }

        const localizationPresent = await Localization.findOne({ env: application.env, application: application._id, status: 'PUBLISHED' });
        if (!localizationPresent) {
            return errorResponse(res, 'PublishedLocalizationNotFound', 404);
        }
        const localizationKeys = localizationPresent.localizationKeys;
        const data = localizationPresent.data;
        const localization = new Localization({
            version: generateGUID(),
            status: "DRAFT",
            localizationKeys,
            data,
            application: application._id,
            env: application.env,
            createdBy: req.user._id
        });
        await localization.save();
        return successResponse(res, localization, 'LocalizationCreated');
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function publishLocalization (req, res) {
    try {
        const localization = await Localization.findById(req.params.localizationId);
        if (!localization) {
            return errorResponse(res, 'LocalizationNotFound', 404);
        }
        if (localization.status === 'PUBLISHED') {
            return errorResponse(res, 'LocalizationAlreadyPublished', 400);
        }
        const application = await Application.findById(localization.application);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }
        const localizationPresent = await Localization.findOne({ env: application.env, application: application._id, status: 'PUBLISHED' });
        if (!localizationPresent) {
            return errorResponse(res, 'PublishedLocalizationNotFound', 404);
        }
        localization.status = 'PUBLISHED';
        localization.version = (new Date()).valueOf();
        localization.releaseNotes = req.body.releaseNotes;
        localizationPresent.status = 'ARCHIVED';
        await localization.save();
        await localizationPresent.save();
        return successResponse(res, 200, 'LocalizationPublished', localization);
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function getLocalization (req, res) {
    try {
        const localization = await Localization.findById(req.params.localizationId).populate('application createdBy');
        if (!localization) {
            return errorResponse(res, 'LocalizationNotFound', 404);
        }
        return successResponse(res, localization, "LocalizationFound");
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function getLocalizationByApplicationId (req, res) {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }
        const localization = await Localization.findOne({ env: application.env, application: application._id, status: 'PUBLISHED' });
        return successResponse(res, localization, "LocalizationFound");
    } catch (error) {
        return null;
    }
}

async function updateLocalization (req, res) {
    try {
        const localization = await Localization.findById(req.params.localizationId);
        if (!localization) {
            return errorResponse(res, 'LocalizationNotFound', 404);
        }
        const application = await Application.findById(localization.application);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }
        if (localization.status !== 'DRAFT') {
            return errorResponse(res, 'PublishedLocalizationCannotBeUpdated', 400);
        }
        const errors = await localizationDataValidation(req.body.localizationKeys, req.body.data, application.env);
        if (errors.length) {
            return errorResponse(res, errors, 400);
        }
        localization.localizationKeys = req.body.localizationKeys;
        localization.data = req.body.data;
        await localization.save();
        return successResponse(res, localization, 'localizationUpdated');
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function getLocalizationByLanguage (req, res) {
    try {
        const localization = await Localization.findOne({ env: req.params.env, application: req.params.applicationId, status: 'PUBLISHED' });
        if (!localization) {
            return errorResponse(res, 'LocalizationNotFound', 404);
        }
        const values = localization.data.filter((data) => {
            if (data.languageCode === req.params.languageCode) {
                return data.values;
            }
        });
        if (!values.length) {
            return errorResponse(res, 'LanguageNotFound', 404);
        }
        const localizationData = {};
        localization.localizationKeys.forEach((key, index) => {
            console.log(key, values[0].values[index]);
            localizationData[key] = values[0].values[index];
        });
        return successResponse(res, localizationData, "LocalizationFound");
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function getDraftLocalization (req, res) {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return errorResponse(res, 'ApplicationNotFound', 404);
        }
        const localizations = await Localization.find({ env: application.env, application: application._id, status: 'DRAFT' });
        return successResponse(res, localizations, "LocalizationFound");
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function deleteLocalization (req, res) {
    try {
        const localization = await Localization.findById(req.params.localizationId);
        if (!localization) {
            return errorResponse(res, 'LocalizationNotFound', 404);
        }
        if (localization.status === 'PUBLISHED' || localization.status === 'ARCHIVED') {
            return errorResponse(res, 'PublishedLocalizationCannotBeDeleted', 400);
        }

        await localization.deleteOne();

        return successResponse(res, 200, 'LocalizationDeleted');
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

module.exports = {
    createNewLocalization,
    createDraftLocalization,
    publishLocalization,
    getLocalization,
    getLocalizationByApplicationId,
    updateLocalization,
    getLocalizationByLanguage,
    deleteLocalization,
    getDraftLocalization
};