const envs = require('../constants/enum/env.json');

function userAllowedEnvs(envs) {
    if (envs.indexOf(env) === -1) {
        return false;
    }
    return true;
}

module.exports = { userAllowedEnvs };