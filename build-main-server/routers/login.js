const { AddDeveloper } = require("../services/Developer/AddDeveloper");
const { GoogleLogin } = require("../services/Developer/GoogleLogin");

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
        isTokenRequired: false
    }
];

module.exports = routesConfig