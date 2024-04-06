const { GoogleLogin, AddDeveloper, ValidateToken } = require("../services/Developer");

const routesConfig = [
    {
        method: 'post',
        path: '/google',
        controller: GoogleLogin,
        middlewares: [],
        description: 'Developer User Login with Google Account',
        isTokenRequired: false
    },
    {
        method: 'post',
        path: '/addDeveloper',
        controller: AddDeveloper,
        middlewares: [],
        description: 'Add Developer to the database',
        isTokenRequired: true
    },
    {
        method: 'get',
        path: '/validateToken',
        controller: ValidateToken,
        middlewares: [],
        description: 'Validate token',
        isTokenRequired: true
    }
];

module.exports = routesConfig