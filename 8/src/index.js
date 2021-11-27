const mb = require('mountebank');
const settings = require('./settings');
const currencyService = require('./currencyService');

async function start() {
    try {
        const mbServerInstance = await mb.create({
            port: settings.port,
            pidfile: '../mb.pid',
            logfile: '../mb.log',
            protofile: '../protofile.json',
            ipWhitelist: ['*']
        });
        currencyService()
    }
    catch (e) {
        console.log(e)
    }
}

start()
