const routers = [
    {
        path: '/user/login', // USER LOGIN
        router: require('./routers/developer')
    },
    {
        path: '/client', // CLIENT
        router: require('./routers/client')
    },
    {
        path: '/application', // APPLICATION
        router: require('./routers/application')
    },
    {
        path: '/localization', // LOCALIZATION
        router: require('./routers/localization')
    },
    {
        path: '/publishInfo', // PUBLISH INFO
        router: require('./routers/publishInfo')
    }
]

module.exports = routers;