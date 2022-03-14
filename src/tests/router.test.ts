import request from 'supertest' // Used supertest: https://github.com/visionmedia/supertest
import express from 'express'
import router from '../router'

const app = express()
app.use('/', router)

describe('autocomplete-addresses-api routes', () => {
  test('GET / > returns a welcome message, suggesting checking out the GitHub repo', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.text).toContain(
      '<a href="https://github.com/nunogois/autocomplete-addresses-api" target="_blank">autocomplete-addresses-api</a>'
    )
  })

  test('GET /search/ab > returns a 400 with an error message, since the query param is required', async () => {
    const res = await request(app).get('/search/ab')
    expect(res.statusCode).toBe(400)
    expect(res.text).toBe(
      'Query parameter is required and should have be at least 3 characters long.'
    )
  })

  test('GET /search/Fabnaveien > returns one address that includes "Fabnaveien"', async () => {
    const res = await request(app).get('/search/Fabnaveien')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
    expect(JSON.stringify(res.body[0])).toContain('Fabnaveien')
  })

  test('GET /search/fabnaveien > returns one address that includes "fabnaveien", supporting case insensitive', async () => {
    const res = await request(app).get('/search/fabnaveien')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
    expect(JSON.stringify(res.body[0]).toLowerCase()).toContain('fabnaveien')
  })

  test('GET /search/fabnav > returns one address that includes "fabnav", supporting case insensitive and not whole words', async () => {
    const res = await request(app).get('/search/fabnav')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
    expect(JSON.stringify(res.body[0]).toLowerCase()).toContain('fabnav')
  })

  test("GET /search/oslo > returns 20 addresses, since that's the max and there are many matches", async () => {
    const res = await request(app).get('/search/oslo')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(20)
  })
})
