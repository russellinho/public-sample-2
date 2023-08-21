import app from '../src'
import chai from 'chai'
import request from 'supertest'
const assert = chai.assert

describe('Order tests', () => {
    describe('save invalid order test - invalid user id', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                // const appEndUserId = response.user_id;
                const appEndUserId = '$%j';
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId,
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'app_end_user_id required min:12 max:64')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order test - no user id', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                // const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'app_end_user_id required min:12 max:64')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order test - not matching quote ID', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = 'ohoioig67f6fj9hon3455';
                const appEndUserId = 'abc123testId1234abcdefg';
                const fiatCurrency = 'USD';
                const fiatAmountBase = 5000;
                const fiatAmountTotal = 5000;

                const requestedDigitalAmountCurrency = 'ETH';
                const requestedDigitalAmount = 0.5;

                const destinationWalletCurrency = 'ETH';
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'string')
                    assert.equal(response2, 'Invalid userId')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - no fiat provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'fiat currency required')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - fiat amount less than min provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = 1;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'fiat amount is required, must be a number, and must be between 50 and 20,000')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - fiat amount more than max provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = 100000000000000000;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'fiat amount is required, must be a number, and must be between 50 and 20,000')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - invalid digital currency provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = 'HEX';
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'requested currency required')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - no digital currency amount provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                // const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'requested amount required and must be a number')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - destination wallet currency none provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                // const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'destination wallet currency required')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - destination wallet address none provided', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                // const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'destination address is required and must be a valid address')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save invalid order - destination wallet address invalid', () => {
        it('should throw a validation error', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = 'asdfghjkl;';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, true)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Array')
                    assert.equal(response2[0], 'destination address is required and must be a valid address')
                    done();
                })
            })            
        }).timeout(5000)
    })

    describe('save valid order test', () => {
        it('should save the order', (done) => {
            // get a valid quote
            const _digital = 'ETH';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                
                const quoteId = response.quote_id;
                const appEndUserId = response.user_id;
                const fiatCurrency = response.fiat_money.currency;
                const fiatAmountBase = response.fiat_money.base_amount;
                const fiatAmountTotal = response.fiat_money.total_amount;

                const requestedDigitalAmountCurrency = response.digital_money.currency;
                const requestedDigitalAmount = response.digital_money.amount;

                const destinationWalletCurrency = response.digital_money.currency;
                const destinationWalletAddress = '0x41be1Fa064BCC610CEEFA698890032beA46c6ceB';

                // submit quote in order
                request(app)
                .post('/order')
                .send({
                    'account_details': {
                        'app_end_user_id': appEndUserId
                    },
                    'transaction_details': {
                        'payment_details': {
                            'quote_id': quoteId,
                            'fiat_total_amount': {
                                'currency': fiatCurrency,
                                'amount': fiatAmountTotal
                            },
                            'requested_digital_amount': {
                                'currency': requestedDigitalAmountCurrency,
                                'amount': requestedDigitalAmount
                            },
                            'destination_wallet': {
                                'currency': destinationWalletCurrency,
                                'address': destinationWalletAddress,
                            }
                        }
                    }
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err2, res2) => {
                    let body2 = res2.body
                    assert.typeOf(body2, 'Object')
                    assert.equal(body2.error, false)
                    let response2 = body2.result
                    assert.typeOf(response2, 'Object')
                    assert.equal(response2.payment_post_url, 'https://sandbox.test-simplexcc.com/payments/new')
                    done();
                })
            })            
        }).timeout(5000)
    })
})
