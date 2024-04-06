const routesConfig = [
    {
        method: 'post',
        path: '/create',
        controller: createRestApi,
        middlewares: [],
        description: 'Create a new Rest API',
        isTokenRequired: true
    },
];

module.exports = routesConfig;
