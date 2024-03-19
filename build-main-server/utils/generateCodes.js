const generateClientCode = () => {
    return "xxxxxx-xxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const generateClientEnvCode = () => {
    return "xxx-xxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const generateAppCode = () => {
    return "xxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    generateClientCode,
    generateClientEnvCode,
    generateAppCode
}