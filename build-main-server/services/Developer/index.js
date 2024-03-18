const { successResponse, errorResponse } = require('../../utils/response');
const customJwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const Developer = require('../../models/developer');
const jwt = require('jsonwebtoken');

async function AddDeveloper (req, res) {
    const { email, given_name, family_name, picture } = req.body;

    const developer = await Developer.findOne({email});
    if (developer) { return errorResponse(res, { error: 'Developer already exists', message: "Developer already exists" }, 400) }

    const newDeveloper = new Developer({
        email,
        name: given_name + ' ' + family_name,
        picture
    });
    try {
        const savedDeveloper = await newDeveloper.save();
        return successResponse(res, savedDeveloper, 'Developer added successfully');
    } catch (error) {
        return errorResponse(res, error, 500);
    }
};

async function GoogleLogin (req, res) {
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

module.exports = {
    GoogleLogin,
    AddDeveloper
};