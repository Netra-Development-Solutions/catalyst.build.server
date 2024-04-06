const Language = require('../../models/language');
const { successResponse, errorResponse } = require('../../utils/response');
const envs = require('../../constants/enum/env.json');

const addNewLanguage = async (req, res) => {
    try {
        const { name, code } = req.body;
        if (!name || !code ) {
            return errorResponse(res, 'requiredFieldsMissing', 400);
        }
        var language = new Language({
            name,
            code,
            env: "DEV",
            createdBy: req.user._id
        });
        language = await language.save();
        return successResponse(res, language, 'languageAddedSuccessfully');
    } catch (error) {
        return errorResponse(res, error);
    }
};

const migrateLanguages = async (req, res) => {
    try {
        const { fromEnv, toEnv } = req.params;
        if (!fromEnv || !toEnv) {
            return errorResponse(res, 'requiredFieldsMissing', 400);
        }
        const levelPrev = envs[fromEnv].level;
        const levelNext = envs[toEnv].level;

        if (levelNext - levelPrev !== 1) {
            return errorResponse(res, 'invalidEnvMigration', 400);
        }

        const languagesPrev = await Language.find({ env: fromEnv });
        const languagesNext = await Language.find({ env: toEnv });

        const missingLanguages = languagesPrev.filter(lang => !languagesNext.find(l => l.code === lang.code));
        missingLanguages.forEach(async lang => {
            var language = new Language({
                name: lang.name,
                code: lang.code,
                env: toEnv,
                createdBy: req.user._id
            });
            await language.save();
        });

        return successResponse(res, {migratedLanguages: missingLanguages}, 'languagesMigratedSuccessfully');
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getLanguagesByEnv = async (req, res) => {
    try {
        const { env } = req.params;
        if (!env) {
            return errorResponse(res, 'requiredFieldsMissing', 400);
        }
        const languages = await Language.find({ env });
        return successResponse(res, languages, 'languagesFetchedSuccessfully');
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    addNewLanguage,
    getLanguagesByEnv,
    migrateLanguages
};