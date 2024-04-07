const { successResponse, errorResponse } = require('../../utils/response');
const customJwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const User = require('../../models/User');
const { generateSecretKey } = require('../../utils/generateSecretKey');

const addSystemUser = async (req, res) => {
    try {
        const { username, isServerUser } = req.body;
        if (!username) {
            return errorResponse(res, 'Username is required', 400);
        }
        const user = await User.findOne({ username });
        if (user) {
            return errorResponse(res, 'Username already exists', 400);
        }
        const newUser = new User({
            isSystemUser: true,
            isServerUser: isServerUser || false,
            secretKey: generateSecretKey(),
            name: username,
            username
        });
        await newUser.save();
        const token = customJwt.sign({ _id: newUser._id, secretKey: newUser.secretKey }, process.env.AES_GCM_ENCRYPTION_KEY, process.env.JWT_TOKEN_SECRET, process.env.AES_GCM_ENCRYPTION_IV, "1y");
        return successResponse(res, { token, user: newUser }, "System user added successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

const verifySystemToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return errorResponse(res, 'Token is required', 400);
        }
        const decoded = customJwt.verify(token);
        if (!decoded) {
            return errorResponse(res, 'Invalid token', 400);
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }
        if (user.secretKey !== decoded.secretKey) {
            return errorResponse(res, 'Invalid token', 400);
        }
        return successResponse(res, user, "Token verified successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

const generateSystemToken = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return errorResponse(res, 'Username is required', 400);
        }
        const user = await User.findOne({ username });
        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }
        user.secretKey = generateSecretKey();
        await user.save();
        const token = customJwt.sign({ _id: user._id, secretKey: user.secretKey }, process.env.AES_GCM_ENCRYPTION_KEY, process.env.JWT_TOKEN_SECRET, process.env.AES_GCM_ENCRYPTION_IV, "1y");
        return successResponse(res, { token, user }, "Token generated successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

module.exports = {
    addSystemUser,
    verifySystemToken,
    generateSystemToken
};