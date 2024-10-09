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

kit.start({list : ['cache', 'nodeManager']}).then(() => {

    console.log('started')

    var proxy = kit.proxys()

    proxy.api.node.rpc.action({method : 'getnodeinfo', parameters : []}).then(r => {
    }).catch(e => {
        console.log("error", e)
    })

}).catch(e => {
    console.log(e)
})