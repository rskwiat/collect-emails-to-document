const request = require('supertest');
const app = require('../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('The api/email path', () => {
  test('It should be return a 422 error when nothing is passed', done => {
    request(app)
      .post('/api/email')
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({ "error": "You must provide a valid email address" });
        done();
      });
  });
});
