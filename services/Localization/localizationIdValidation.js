const mongoose = require('mongoose');

function localizationIdValidation_Param (req, res, next) {
    const localizationId = req.params.localizationId;
    if (!mongoose.Types.ObjectId.isValid(localizationId)) {
        return res.status(400).json({ error: 'InvalidLocalizationId' });
    }
    next();
}

module.exports = {
    localizationIdValidation_Param
};