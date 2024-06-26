const User = require("../models/User");
const { errorResponse } = require("../utils/response");
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');

const authenticateUserMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            return errorResponse(res, { error: 'Authentication error', message: "Please authenticate" }, 401)
        }
        if (jwt.verify(token)) {
            const decoded = jwt.decode(token)
            const user = await User.findById(decoded._id)
            if (!user) {
                return errorResponse(res, { error: 'Authentication error', message: "Invalid Token" }, 404)
            }
            req.user = user
        } else {
            return errorResponse(res, { error: 'Authentication error', message: "Invalid token" }, 401)
        }
        next()
    } catch (error) {
        const errorObject = error?.response?.data || error
        return errorResponse(res, errorObject, error?.response?.status || 500)
    }
}

module.exports = authenticateUserMiddleware;