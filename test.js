global.MIN_NODES_COUNT = 10
global.WRITE_LOGS = true
global.USE_TRUST_NODES_ONLY = false
global.REVERSE_PROXY = true
global.USE_TLS_NODES_ONLY = false
/*
global.USE_TLS_NODES_ONLY = true
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
*/


const kit = require("./src/kit.js")
const f = require("./src/functions.js");


kit.start({list : ['cache', 'nodeManager']}).then(() => {

    console.log('started')

    var proxy = kit.proxys()

    proxy.api.node.rpc.action({method : 'getnodeinfo', parameters : []}).then(r => {
        console.log("result", r)
    }).catch(e => {
        console.log("error", e)
    })

}).catch(e => {
    console.log(e)
})
/*
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
})*/