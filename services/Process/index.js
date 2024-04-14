const { CREATE_NEW_APPLICATION_FLOW } = require("../../constants/flows");
const axios = require("axios");
const { generateGUID } = require("../../utils/generateGUID");
const { successResponse, errorResponse } = require("../../utils/response");

const triggerNewApplicationFlow = async (req, res) => {
    const { body } = req;
    if (!body.source || !body.appName || !body.clientCode) {
        return errorResponse(res, "Invalid request body", 400);
    }

    const transactionId = generateGUID();
    const env = process.env?.NODE_ENV.toUpperCase();
    const resposne = await axios.post(`${CREATE_NEW_APPLICATION_FLOW}/${transactionId}`, {
        transactionId,
        env,
        source: body.source,
        appName: body.appName,
        clientCode: body.clientCode,
        token: req.headers.authorization
    })

    return successResponse(res, resposne.data, "Flow triggered successfully");
};

module.exports = {
    triggerNewApplicationFlow
};