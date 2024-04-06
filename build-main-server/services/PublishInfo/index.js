const Application = require('../../models/application');
const PublishInfo = require('../../models/publishInfo');
const Localization = require('../../models/localization');
const { generateGUID } = require('../../utils/generateGUID');
const { successResponse, errorResponse } = require('../../utils/response');

async function createNewPublishInfo (req, res) {
    try {
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId);
        if (!application) {
            return errorResponse(res, 'Application not found', 404);
        }

        const { localizationInfo } = req.body;
        const localization = await Localization.findById(localizationInfo);
        if (!localization) {
            return errorResponse(res, 'Localization not found', 404);
        }

        const publishId = generateGUID();
        const newPublishInfo = new PublishInfo({
            application: applicationId,
            publishId,
            modifiedBy: req.user._id,
            localizationInfo,
            publishTo: {
                clientCode: application.client.code,
                environment: application.env,
                version: (new Date()).valueOf()
            },
            publishType: "New",
            processStatus: "Idle",
            publishStatus: "Draft",
            publishVersion: (new Date()).valueOf()
        });
        const publishInfo = await newPublishInfo.save();

        return successResponse(res, publishInfo, 'PublishInfo created successfully');
    } catch (error) {
        console.log(error);
        return errorResponse(res, error.message, 500);
    }
};

async function createDraftPublishInfo (req, res) {};

async function getPublishInfo (req, res) {};

async function getPublishInfoById (req, res) {};

async function publish_PublishInfo (req, res) {};

module.exports = {
    createNewPublishInfo,
    createDraftPublishInfo,
    getPublishInfo,
    getPublishInfoById,
    publish_PublishInfo
};