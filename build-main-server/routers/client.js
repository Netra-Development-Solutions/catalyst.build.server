const { createClient, getClientByCode, addEnvClient, getAllClients } = require("../services/Clients");

const routesConfig = [
    {
        method: 'post',
        path: '/create',
        controller: createClient,
        middlewares: [],
        description: 'Create a new client, and add PROD environment by default.',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/getClients',
        controller: getAllClients,
        middlewares: [],
        description: 'Get all clients',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/:clientCode',
        controller: getClientByCode,
        middlewares: [],
        description: 'Get client by clientCode',
        isTokenRequired: true
    },
    {
        method: 'post',
        path: '/add-env',
        controller: addEnvClient,
        middlewares: [],
        description: 'Add environment to client',
        isTokenRequired: true
    }
];

module.exports = routesConfig