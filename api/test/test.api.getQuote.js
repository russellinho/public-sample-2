import app from '../src'
import chai from 'chai'
import request from 'supertest'
const assert = chai.assert

describe('Quote tests', () => {
    describe('unsupported fiat currency test', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'BTC';
            const _fiat = 'KRW';
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
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'fiat_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('unsupported digital currency test', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'HEX';
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
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'digital_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('no digital currency provided fail', () => {
        it('should throw a validation error', (done) => {
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'fiat_currency': _fiat,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'digital_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('no fiat currency provided fail', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'BTC';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'requested_currency': _digital,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'fiat_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('unsupported requested currency fail', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'HEX';
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
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'digital_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('no supported currency provided fail', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'HEX';
            const _fiat = 'USD';
            const _amount = 0.5
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_amount': _amount
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[0], 'digital_currency required')
                done();
            })
        }).timeout(5000)
    })

    describe('requested amount not provided fail', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'BTC';
            const _fiat = 'KRW';
            request(app)
            .post('/quote')
            .send({
                'digital_currency': _digital,
                'fiat_currency': _fiat,
                'requested_currency': _digital,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[1], 'requested_amount required and must be a number')
                done();
            })
        }).timeout(5000)
    })

    describe('requested amount not a number fail', () => {
        it('should throw a validation error', (done) => {
            const _digital = 'BTC';
            const _fiat = 'KRW';
            const _amount = 'aaa'
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
                assert.equal(body.error, true)
                let response = body.result
                assert.typeOf(response, 'Array')
                assert.equal(response[1], 'requested_amount required and must be a number')
                done();
            })
        }).timeout(5000)
    })

    describe('valid quote test', () => {
        it('should show quote information', (done) => {
            const _digital = 'BTC';
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
                done();
            })
        }).timeout(5000)
    })
})