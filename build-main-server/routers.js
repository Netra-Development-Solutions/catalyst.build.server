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
    }
]

module.exports = routers;