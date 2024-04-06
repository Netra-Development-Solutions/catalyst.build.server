const { createNewPublishInfo } = require("../services/PublishInfo");
const { applicationIdValidation_Param } = require("../services/Application/applicationIdValidation");

const routesConfig = [
    {
        method: 'post',
        path: '/:applicationId/createNew',
        controller: createNewPublishInfo,
        middlewares: [applicationIdValidation_Param],
        description: 'Create localization for the first time',
        isTokenRequired: true
    },
];

module.exports = routesConfig;