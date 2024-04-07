const { addSystemUser, verifySystemToken, generateSystemToken } = require("../services/SystemUser");

const routesConfig = [
    {
        method: 'post',
        path: '/addSystemUser',
        controller: addSystemUser,
        middlewares: [],
        description: 'Add a new system user',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: '/verifySystemToken',
        controller: verifySystemToken,
        middlewares: [],
        description: 'Verify system token',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: '/generateSystemToken',
        controller: generateSystemToken,
        middlewares: [],
        description: 'Generate system token',
        isTokenRequired: true
    }
];

module.exports = routesConfig