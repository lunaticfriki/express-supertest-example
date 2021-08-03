const request = require('supertest')
const app = require('../src/app')

/**
 * Testing get all users endpoint
 */
describe('GET /users', () => {
  it('Should respond with a status 200 and a json containing a list of all users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /users/:id', () => {
  it('Should respond with a status 200 and a json containing a single user', (done) => {
    request(app)
      .get('/users/U0001')
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('Should respond with a status 200 and a message "User U0001 found" when the user id is correct', (done) => {
    request(app)
      .get('/users/U0001')
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect('"User U0001 found"')
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })

  it('Should respond with a status 404 and amessage "User not found" when the user does not exist', (done) => {
    request(app)
      .get('/users/randomuser')
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"User not found"')
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('POST /users/', () => {
  it('Should respond with a 201 status and a message "User created" when the user is created successfully', (done) => {
    const data = {
      username: 'Rodia',
      password: 'mypassword',
    }
    request(app)
      .post('/users/')
      .send(data)
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect('"User created"')
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
  it('Should respond with a status 400 and a message "User not created" when the user is not created successfully', (done) => {
    const data = {}
    request(app)
      .post('/users/')
      .send(data)
      .set('Accept', 'application-json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"User not created"')
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})
