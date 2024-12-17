const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('Translation POST request to /api/translate', () => {
        test('With text and locale fields', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'text');
                    assert.property(res.body, 'translation');
                    assert.include(res.body.translation, `<span class="highlight">favourite</span>`);
                    done();
                })
        });

        test('With text and invalid locale field', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'invalid-locale'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                })
        });

        test('With missing text field', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        });

        test('With missing locale field', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        });

        test('With empty text', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                })
        });

        test('With text that needs no translation', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'This text needs no translation',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'text');
                    assert.property(res.body, 'translation');
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                })
        });
    });
});
