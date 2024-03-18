const Developer = require('../../models/developer');
const { successResponse, errorResponse } = require('../../utils/response');

const AddDeveloper = async (req, res) => {
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

module.exports = { AddDeveloper };