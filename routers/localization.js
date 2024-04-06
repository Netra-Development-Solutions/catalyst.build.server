const { applicationIdValidation_Param } = require('../services/Application/applicationIdValidation');
const { localizationIdValidation_Param } = require('../services/Localization/localizationIdValidation');
const { createNewLocalization, publishLocalization, createDraftLocalization, getLocalization, getLocalizationByApplicationId, updateLocalization, getLocalizationByLanguage, deleteLocalization, getDraftLocalization } = require('../services/Localization');
const { addNewLanguage, getLanguagesByEnv, migrateLanguages } = require('../services/Localization/Language');

const routesConfig = [
    {
        method: 'post',
        path: '/:applicationId/createNew',
        controller: createNewLocalization,
        middlewares: [applicationIdValidation_Param],
        description: 'Create localization for the first time',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: '/:applicationId/createDraft',
        controller: createDraftLocalization,
        middlewares: [applicationIdValidation_Param],
        description: 'Create draft localization taking previous version as base',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: '/:localizationId/publish',
        controller: publishLocalization,
        middlewares: [localizationIdValidation_Param],
        description: 'Publish draft localization',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/:localizationId/get',
        controller: getLocalization,
        middlewares: [localizationIdValidation_Param],
        description: 'Get localization',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: "/addNewLanguage",
        controller: addNewLanguage,
        middlewares: [],
        description: 'Add new language',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: "/getLanguagesByEnv/:env",
        controller: getLanguagesByEnv,
        middlewares: [],
        description: 'Get languages by environment',
    },
    {
        method: 'post',
        path: "/migrateLanguages/:fromEnv/:toEnv",
        controller: migrateLanguages,
        middlewares: [],
        description: 'Migrate languages from one environment to another',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: "/:applicationId/getByApplicationId",
        controller: getLocalizationByApplicationId,
        middlewares: [applicationIdValidation_Param],
        description: 'Get localization by application id',
        isTokenRequired: true
    },
    {
        method: 'put',
        path: '/:localizationId/update',
        controller: updateLocalization,
        middlewares: [localizationIdValidation_Param],
        description: 'Update localization',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/:applicationId/:env/:languageCode',
        controller: getLocalizationByLanguage,
        middlewares: [applicationIdValidation_Param],
        description: 'Get localization by application id',
        isTokenRequired: true
    },
    {
        method: 'delete',
        path: '/:localizationId/delete',
        controller: deleteLocalization,
        middlewares: [localizationIdValidation_Param],
        description: 'Delete localization',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/:applicationId/getDraft',
        controller: getDraftLocalization,
        middlewares: [applicationIdValidation_Param],
        description: 'Get draft localization',
        isTokenRequired: true
    }
];

module.exports = routesConfig;