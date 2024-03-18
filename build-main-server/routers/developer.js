const { GoogleLogin, AddDeveloper } = require("../services/Developer");

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
    }
];

module.exports = routesConfig