const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const settings = require('./settings');

function getImposter(body) {
    const url = `http://127.0.0.1:${settings.port}/imposters`;

    return fetch(url, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

module.exports = getImposter
