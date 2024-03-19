const Application = require('../../models/application');
const Client = require('../../models/client');
const { generateAppCode } = require('../../utils/generateCodes');
const { successResponse, errorResponse } = require('../../utils/response');

async function createApplication(req, res) {
    try {
        const { appName, clientCode, env } = req.body;
        if (!appName || !clientCode || !env) {
            return errorResponse(res, 'Invalid request', 400);
        }
        console.log(appName, clientCode, env);

        const apps = await Application.find({appName,'client.code': clientCode,env})
        if (apps.length > 0) {
            return errorResponse(res, 'Application already exists', 400);
        }

        if (!await Client.findOne({ clientCode })) {
            return errorResponse(res, 'Invalid client code', 400);
        }   

        var application = new Application({
            appName,
            client: {
                code: clientCode,
                id: (await Client.findOne({ clientCode }))._id.toString()
            },
            env,
            createdBy: req.user._id,
            appCode: generateAppCode()
        });
        application = await application.save();
        await application.populate('createdBy client.id')
        return successResponse(res, {application}, 'Application created successfully');
    } catch (error) {
        return errorResponse(res, error);
    }
}

async function getApplications(req, res) {
    try {
        const { clientCode, env } = req.query;
        const applications = await Application.find({
            'client.code': clientCode,
            env
        }).populate('createdBy client.id')
        return successResponse(res, 'Applications fetched successfully', applications);
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    createApplication,
    getApplications
};