const kit = require("./src/kit.js")
const f = require("./src/functions.js");

console.log(f.addzeros('6715'));

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