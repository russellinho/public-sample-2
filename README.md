# Simplex backend API

Full backend api to integrate simplex crypto api powered by nanobox

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Setup `.env` file with following variable
```
WALLET_ID=
QUOTE_EP=https://sandbox.test-simplexcc.com/wallet/merchant/v2/quote
ORDER_EP=https://sandbox.test-simplexcc.com/wallet/merchant/v2/payments/partner/data
PAYMENT_EP=https://sandbox.test-simplexcc.com/payments/new
SIMPLEX_APIKEY=
API_HOST=

API_KEY=
API_KEY_HEADER=apikey
IOS_REFERER=
ANDROID_REFERER=
```

## Local
### Installing
Start by installing the dependencies by running ```npm install``` in each of the api and frontend directories.

### Running
To start the two components locally run ```npm start``` in the api directory first followed by ```npm start``` in the frontend directories.

## Running the tests
```
npm run test
```
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Documentation
/currentCurrencies [GET]
- Returns the current fiat and crypto currencies available for trade.

/exchangeRates [GET]
- Gets the current exchange rates between a pair of currencies.
Response:
Error:
Success:
{
    rate_currency: String,
    base_currency: String,
    min: Number,
    max: Number,
    rate: Number,
    updatedAt: String
}

/quote [POST]
- Creates a quote for a trade between a fiat currency and a digital currency.
{
    'digital_currency': String,
    'fiat_currency': String,
    'requested_currency': String,
    'requested_amount': Number
}
Response:
- Error: digital_currency required | fiat_currency required | requested_currency required | requested_amount required and must be a number
- Success:
{
    user_id: String,
    quote_id: String,
    fiat_total_amount: {
        currency: String,
        amount: Number
    },
    requested_digital_amount: {
        currency: String,
        amount: Number
    },
    status: String,
    source: String
}

/order [POST]
- Creates an order for a provided quote ID and user ID.
'account_details': {
    'app_end_user_id': String,
    "email": String,
    "phone": String,
},
'transaction_details': {
    'payment_details': {
        'quote_id': String,
        'fiat_total_amount': {
            'currency': String,
            'amount': Number
        },
        'requested_digital_amount': {
            'currency': String,
            'amount': Number
        },
        'destination_wallet': {
            'currency': String,
            'address': String
        }
    }
}
Response:
- Error: invalid user ID | app_end_user_id required min:12 max:64 | quote_id required min:12 max:64 | fiat currency required | fiat amount is required, must be a number, and must be between 50 and 20,000 | requested currency required | requested amount required and must be a number | destination wallet currency required | destination address is required and must be a valid address
- Success:
{
    payment_post_url: String,
    version: Number,
    partner: String,
    return_url: String,
    quote_id: String,
    payment_id: String,
    user_id: String,
    destination_wallet_address: String,
    destination_wallet_currency: String,
    fiat_total_amount_amount: Number,
    fiat_total_amount_currency: String,
    digital_total_amount_amount: Number,
    digital_total_amount_currency: String
}

/status/:userId [GET]
- Gets the payment status for the latest order put in by a provided user ID.
Response:
- Error: user id does not exist
- Success:
{
    user_id: String,
    quote_id: String,
    status: String,
    fiat_total_amount: {
        currency: String,
        amount: Number
    },
    requested_digital_amount: {
        currency: String,
        amount: Number
    }
}

/status/:userId/:quoteId [GET]
- Gets the payment status for a given quote ID used by a provided user ID.
Response:
- Error: user id does not exist
- Success:
{
    user_id: String,
    quote_id: String,
    status: String,
    fiat_total_amount: {
        currency: String,
        amount: Number
    },
    requested_digital_amount: {
        currency: String,
        amount: Number
    }
}

/paymentApproved/:userId
- Gets the latest simplex payment event by user ID.
Response:
- Error: user id does not exist
- Success:
{
    event_id: String,
    name: String,
    payment: {
        id: String,
        status: String,
        created_at: String,
        updated_at: String,
        partner_end_user_id: String,
        fiat_total_amount: {
            currency: String,
            amount: Number
        }
    },
    timestamp: Number
}
