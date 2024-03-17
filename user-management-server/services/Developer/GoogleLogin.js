const jwt = require('jsonwebtoken');
const customJwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const Developer = require('../../models/developer');
const { successResponse, errorResponse } = require('../../utils/response');

const GoogleLogin = async (req, res) => {
    try {
        const decodedData = jwt.decode(req.body.credential);
        const { email, given_name, family_name, picture } = decodedData;
        
        const developer = await Developer.findOne({email});
        if (developer) {
            const token = customJwt.sign({email, developerId: developer._id, isAdmin: developer.isAdmin});
            developer.name = `${given_name} ${family_name}`;
            developer.picture = picture;
            developer.save();
            return successResponse(res, {token, email, picture, name: `${given_name} ${family_name}`}, 'Developer logged in successfully');
        }

        return errorResponse(res, 'Could not login, contact administration', 404);
    } catch (error) {
        return errorResponse(res, error, 500);
    }
};

module.exports = {GoogleLogin};