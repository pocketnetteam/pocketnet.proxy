const { kit } = require('pocketnet.proxy')

kit.init({

    server: {
        enabled: true
    }

}).catch(r => {

    console.log(r)
    return Promise.resolve()

}).then(r => {

    ['SIGINT', 'SIGTERM', 'SIGQUIT']
        .forEach(signal => process.on(signal, () => {
            kit.destroy()
            process.exit(0)
        }))
})