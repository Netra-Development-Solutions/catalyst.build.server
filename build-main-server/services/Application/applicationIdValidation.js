const mongoose = require('mongoose');

function applicationIdValidation_Param (req, res, next) {
    const applicationId = req.params.applicationId;
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ error: 'InvalidApplicationId' });
    }
    next();
}

module.exports = {
    applicationIdValidation_Param
};