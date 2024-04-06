const Client = require('../../models/client');
const { generateClientCode, generateClientEnvCode } = require('../../utils/generateCodes');
const { successResponse, errorResponse } = require('../../utils/response');
const envs = require('../../constants/enum/env.json');

async function createClient(req, res) {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return errorResponse(res, "Invalid request", 400);
        }

        if (await Client.findOne({
            email
        })) {
            return errorResponse(res, "Can not add client", 400);
        }

        var client = new Client({ name, email, phone, clientCode: generateClientCode(), createdBy: req.user._id});
        client = await client.save();
        await client.populate('createdBy')
        return successResponse(res, { client }, "Client created successfully.");
    } catch (error) {
        return errorResponse(res, error, 500);
    }
};

async function getClientByCode(req, res) {
    try {
        const clients = await Client.find({
            clientCode: req.params.clientCode
        }).populate('createdBy');
        return successResponse(res, { clients }, "Clients fetched successfully.");
    } catch (error) {
        return errorResponse(res, "Invalid request", 400);
    }
};

async function addEnvClient (req, res) {
    try {
        const { clientCode, env } = req.body;

        if (!clientCode || !env) {
            return errorResponse(res, "Invalid request", 400);
        }

        const client = await Client.findOne({clientCode});
        if (!client) {
            return errorResponse(res, "Invalid request", 400);
        }

        for (let i = 0; i < client.envs.length; i++) {
            if (client.envs[i].env === env) {
                return errorResponse(res, "Environment already exists", 400);
            }
        }

        if (!Object.keys(envs).includes(env)) {
            return errorResponse(res, "Invalid environment", 400);
        }

        client.envs.push({env, clientEnvCode: generateClientEnvCode()});
        await client.save();

        return successResponse(res, { client }, "Environment added successfully.");
    } catch (error) {
        return errorResponse(res, error, 500);
    }
}

async function getAllClients(req, res) {
    try {
        const search = req?.query?.search || '';
        if (!search) {
            const clients = await Client.find({});
            return successResponse(res, { clients }, "Clients fetched successfully.");
        }
        const clients = await Client.find({
            name: { $regex: search, $options: 'i' }
        });
        return successResponse(res, { clients }, "Clients fetched successfully.");
    } catch (error) {
        return errorResponse(res, "Invalid request", 400);
    }
}

module.exports = {
    createClient,
    getClientByCode,
    addEnvClient,
    getAllClients
}