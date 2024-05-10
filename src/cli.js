global.MIN_NODES_COUNT = 10
global.WRITE_LOGS = true
global.USE_TRUST_NODES_ONLY = false
global.USE_TLS_NODES_ONLY = false
global.REVERSE_PROXY = true


var kit = require('./kit.js');
var f = require('./functions');
var readline = require('readline');
const { start } = require('repl');


var _cli = {
    command: function (input) {

        if (!input || input === 'help') {

            input = 'help.commands'

        }

        var inputs = input.split(' ')

        var action = inputs[0]

        var data = undefined;

        try {
            data = JSON.parse(inputs[1] || "")
        }
        catch (e) {
        }

        var kaction = f.deep(kit, 'manage.' + action)

        if (!kaction || typeof kaction !== 'function') return Promise.reject('unknownAction')

        return kaction(data)

    },
    waitcommand: function () {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>'
        });

        rl.prompt();

        rl.on('line', (input) => {

            //input = input.toLowerCase();

            rl.close();

            try {
                _cli.command(input).then(r => {

                    console.log(r || "Done")
                    _cli.waitcommand()
    
                }).catch(e => {
    
                    console.error(e || "Error")
                    _cli.waitcommand()
    
                })
            }
            catch(e){
                console.error(e || "Error")
                _cli.waitcommand()
            }
          

        });
    }
}


const cli = {

    start: function () {
        kit.init({
            server: {
                enabled: true
            }
        }).catch(r => {
            console.log(r)
            return Promise.resolve()
        }).then(r => {

            process.on('SIGTERM', () => {
                cli.destroy()
            });

            process.on('SIGINT', () => {
                cli.destroy()
            });

            _cli.waitcommand()
        })
    },

    destroy: function (repeat) {
        return kit.destroy().catch(e => {
    
            if (!repeat) {
    
                return kit.manage.proxy.detach().then(r => {
                    return cli.destroy(true)
                })
            }
    
            return Promise.resolve()
    
        }).then(r => {
            process.exit(0)
        })
    }

}

module.exports = cli