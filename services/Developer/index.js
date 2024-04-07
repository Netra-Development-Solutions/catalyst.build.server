const { successResponse, errorResponse } = require('../../utils/response');
const customJwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const Developer = require('../../models/User');
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
            const key = process.env['AES_GCM_ENCRYPTION_KEY'];
            const iv = process.env['AES_GCM_ENCRYPTION_IV'];
            const secret = process.env['JWT_TOKEN_SECRET'];
            const token = customJwt.sign({email, developerId: developer._id, isAdmin: developer.isAdmin}, key, secret, iv, '1h');
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

async function ValidateToken (req, res) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const key = process.env['AES_GCM_ENCRYPTION_KEY'];
    const iv = process.env['AES_GCM_ENCRYPTION_IV'];
    const secret = process.env['JWT_TOKEN_SECRET'];
    if (customJwt.verify(token, key, secret, iv)) {
        const decodedData = customJwt.decode(token, key, secret, iv);
        delete decodedData.iat;
        delete decodedData.exp;
        const newToken = customJwt.sign(decodedData, key, secret, iv, '1h');
        return successResponse(res, {message: 'Token is valid', token: newToken}, 'Token is valid');
    }
};

module.exports = {
    GoogleLogin,
    AddDeveloper,
    ValidateToken
};