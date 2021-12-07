const getImposter = require('./mountebankHelper');
const settings = require('./settings')

function currencyService() {
    const availableCurrencies = {
        message: "Available currencies: [RUB, US, EUR]"
    }

    const rubCurrency = {
        "USD": 0.01323,
        "EUR": 0.011771,
    }

    const usCurrency = {
        "RUB": 75.59,
        "EUR": 0.88363,
    }

    const eurCurrency = {
        "RUB": 84.95,
        "USD": 1.13,
    }

    const stubs = [
        {
            predicates: [
                {
                    deepEquals: {
                        method: "GET",
                        path: "/",
                        query: {},
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(availableCurrencies)
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    deepEquals: {
                        method: "GET",
                        path: "/",
                        query: { "currency": "RUB" }
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(rubCurrency)
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    deepEquals: {
                        method: "GET",
                        path: "/",
                        query: { "currency": "US" }
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(usCurrency)
                    }
                }
            ]
        },
        {
            predicates: [
                {
                    deepEquals: {
                        method: "GET",
                        path: "/",
                        query: { "currency": "EUR" }
                    }
                }
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(eurCurrency)
                    }
                }
            ]
        },
        {
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({message: 'Path doesnt exist'})
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.servicePort,
        protocol: 'http',
        stubs: stubs
    };

    return getImposter(imposter);
}

module.exports = currencyService
