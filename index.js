// Importing modules
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authenticateUserMiddleware = require('./middlewares/authenticate');

dotenv.config();
async function fetchServerConfigurations () {
    const configs = (await axios.get(`${process.env.CONFIG_SERVER_BASE_URL}/api/fetchSystemConfigurations/getSystemConfiguration`, {
        headers: {
            'Authorization': `Bearer ${process.env.SYSTEM_TOKEN}`
        }
    })).data.data;
    writeEnvFile(configs);
    dotenv.config({ path: 'system.env' });
}

// Creating app
const app = express();

// Importing routers
const routers = require('./routers');

// Configuring morgan
if (process.env.NODE_ENV.toLocaleLowerCase() === 'dev') {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(morgan('dev', { stream: accessLogStream }));
    app.use(morgan('dev'));
} else {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(morgan('combined'));
}

// Configuring cors
app.use(cors());

// Configuring body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create table containg all routes
var Table = require('cli-table');
const writeEnvFile = require('./utils/writeEnvFile');
var table = new Table({
    head: ['Method', 'Path', 'Description']
});

// Function to generate routers
const generateRouters = async (routers) => {
    for (var routerIndex in routers) {
        const router = routers[routerIndex];
        for (var routeIndex in router.router) {
            const Router = express.Router();
            const route = router.router[routeIndex];
            if (route.isTokenRequired) {
                Router.use(authenticateUserMiddleware);
            }

            Router[route.method](route.path, [...route.middlewares], route.controller);
            table.push([route.method, '/api' + router.path + route.path, route.description]);
            app.use(`/api${router.path}`, Router);
        }
    }
}

// Function to start server
const startServer = async () => {
    try {
        await fetchServerConfigurations();
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
        await generateRouters(routers);
        console.log('Created routers');

        const port = process.env.PORT || 3000;
        if (process.env.NODE_ENV.toLowerCase() === 'dev') {
            app.listen(port, process.env.IP || '192.168.29.103', () => {
                console.clear();
                console.log(`Server started on port ${port}`);
                console.log(table.toString());
            });
        } else {
            app.listen(port , () => {
                console.clear();
                console.log(`Server started on port ${port}`);
                console.log(table.toString());
            });
        }
    } catch (err) {
        console.log(err.message);
    }
}

// Start server
try {
    startServer();
} catch (err) {
    console.log(`Error starting server: , ${err}`);
}