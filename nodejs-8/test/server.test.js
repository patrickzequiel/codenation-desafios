const request = require('supertest')
const server = require('../src/server')
const {
  cleanDB,
  openDB,
  populateDB
} = require('./utils')

beforeAll(() => cleanDB())
afterAll(() => cleanDB())

describe('The API on /api/animals Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      "ANI1580214599567RD121": {
        "created_at": "2020-01-28T12:29:59.567Z",
        "updated_at": "2020-01-28T12:29:59.567Z",
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho mais fofinho desse mundo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Macho",
        "color": "Branco Malhado",
        "image_url": ""
      },
      "ANI1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
    })
  })

  afterAll(() => cleanDB())

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject([
      'total',
      'data'
    ])
  })

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2)

    const res = await request(server.app).get('/api/animals')

    expect(res.body.total).toEqual(2)
    expect(typeof res.body.data).toBe('object')
  })

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1)

    const res = await request(server.app).get('/api/animals')

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        "ANI1580214599567RD121": {
          "created_at": "2020-01-28T12:29:59.567Z",
          "updated_at": "2020-01-28T12:29:59.567Z",
          "pet_name": "Belchior Fernandes Montalvão",
          "description": "Gatinho mais fofinho desse mundo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Macho",
          "color": "Branco Malhado",
          "image_url": ""
        },
        "ANI1580216220549RD493": {
          "created_at": "2020-01-28T12:57:00.550Z",
          "updated_at": "2020-01-28T12:57:00.550Z",
          "pet_name": "Tereza Fernandes Montalvão",
          "description": "Gatinha mais perfeita desse mundão redondo",
          "animal_type": "Gato",
          "pet_age": "6 Meses",
          "sex": "Fêmea",
          "color": "Malhada",
          "image_url": ""
        }
      }
    })
  })
})

describe('The API on /api/animals/:id Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      "ANI1580214599567RD121": {
        "created_at": "2020-01-28T12:29:59.567Z",
        "updated_at": "2020-01-28T12:29:59.567Z",
        "pet_name": "Belchior Fernandes Montalvão",
        "description": "Gatinho mais fofinho desse mundo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Macho",
        "color": "Branco Malhado",
        "image_url": ""
      },
      "ANI1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
    })
  })

  afterAll(() => cleanDB())

})

describe('The API on /api/animals Endpoint at POST method should...', () => {
afterEach(() => cleanDB())

  test(`return 201 as status code and return the item added`, async () => {
    expect.assertions(2)

    const res = await request(server.app)
      .post('/v1/pets')
      .send({
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      "pet_name": "Tereza Fernandes Montalvão",
      "description": "Gatinha mais perfeita desse mundão redondo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Fêmea",
      "color": "Malhada",
      "image_url": ""
    })
  })
})

describe('The API on /api/animals/:id Endpoint at PATCH method should...', () => {
  beforeEach(() => 
  populateDB({
    "ANI1580214599567RD121": {
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": "2020-01-28T12:29:59.567Z",
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "color": "Branco Malhado",
      "image_url": ""
    }
  })
)
afterEach(() => cleanDB())

test(`return 200 as status code and return the item changed`, async () => {
  expect.assertions(2)

  const res = await request(server.app)
    .patch('/movies/ANI1580214599567RD121')
    .send({
      "vacinado": "sim",
      "castrado": "não"
    })

  expect(res.statusCode).toEqual(200)
  expect(res.body).toMatchObject({
      "pet_name": "Belchior Fernandes Montalvão",
      "description": "Gatinho mais fofinho desse mundo",
      "animal_type": "Gato",
      "pet_age": "6 Meses",
      "sex": "Macho",
      "vacinado": "sim",
      "castrado": "não",
      "color": "Branco Malhado",
      "image_url": ""
  })
})
})

describe('The API on /api/animals/:id Endpoint at DELETE method should...', () => {
  beforeEach(() => 
    populateDB({
      "ANI1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "pet_name": "Tereza Fernandes Montalvão",
        "description": "Gatinha mais perfeita desse mundão redondo",
        "animal_type": "Gato",
        "pet_age": "6 Meses",
        "sex": "Fêmea",
        "color": "Malhada",
        "image_url": ""
      }
    })
  )
  afterEach(() => cleanDB())

  test(`return 204 as status code to a item deleted successfully`, async () => {
    expect.assertions(1)

    const res = await request(server.app)
      .delete('/movies/ANI1580216220549RD493')

    expect(res.statusCode).toEqual(204)
  })
})
