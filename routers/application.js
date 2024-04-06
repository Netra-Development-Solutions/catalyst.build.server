const { createApplication, getApplications } = require('../services/Application');

const routesConfig = [
    {
        method: 'post',
        path: '/create',
        controller: createApplication,
        middlewares: [],
        description: 'Create a new application',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/get',
        controller: getApplications,
        middlewares: [],
        description: 'Get applications',
        isTokenRequired: true
    }
]

module.exports = routesConfig;