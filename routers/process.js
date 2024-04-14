const { triggerNewApplicationFlow } = require("../services/Process");

const routesConfig = [
    {
        method: 'post',
        path: '/application/createNew',
        controller: triggerNewApplicationFlow,
        middlewares: [],
        description: 'Trigger postman flow to create new application',
        isTokenRequired: true
    },
];

module.exports = routesConfig;