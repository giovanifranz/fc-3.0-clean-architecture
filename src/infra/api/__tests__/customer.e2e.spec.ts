import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  it,
  expect,
} from '@jest/globals'
import request from 'supertest'
import { InputCreateCustomerDto } from '@/useCases/customer/create/create.customer.dto'
import { sequelize, app } from '../fastify'
import { InputUpdateCustomerDto } from '@/useCases/customer/update/update.customer.dto'

describe('E2E test for customer', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const input: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const response = await request(app.server).post('/customer').send(input)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(input.name)
    expect(response.body.address.street).toBe(input.address.street)
    expect(response.body.address.number).toBe(input.address.number)
    expect(response.body.address.zip).toBe(input.address.zip)
    expect(response.body.address.city).toBe(input.address.city)
  })

  it('should not create a customer with invalid input', async () => {
    const input = { name: 'John' }

    const response = await request(app.server).post('/customer').send(input)

    expect(response.status).toBe(500)
  })

  it('should list all customer json', async () => {
    const input1: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const input2: InputCreateCustomerDto = {
      name: 'James',
      address: {
        street: 'Street 2',
        number: 321,
        zip: 'Zip 2',
        city: 'City 2',
      },
    }
    const response1 = await request(app.server).post('/customer').send(input1)
    expect(response1.status).toBe(201)

    const response2 = await request(app.server).post('/customer').send(input2)
    expect(response2.status).toBe(201)

    const listResponse = await request(app.server)
      .get('/customer')
      .set('Accept', 'application/json')
      .send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe(input1.name)
    expect(customer1.address.street).toBe(input1.address.street)
    expect(customer1.address.city).toBe(input1.address.city)
    expect(customer1.address.zip).toBe(input1.address.zip)
    expect(customer1.address.number).toBe(input1.address.number)

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe(input2.name)
    expect(customer2.address.street).toBe(input2.address.street)
    expect(customer2.address.city).toBe(input2.address.city)
    expect(customer2.address.zip).toBe(input2.address.zip)
    expect(customer2.address.number).toBe(input2.address.number)
  })

  it('should list all customer xml', async () => {
    const input1: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const input2: InputCreateCustomerDto = {
      name: 'James',
      address: {
        street: 'Street 2',
        number: 321,
        zip: 'Zip 2',
        city: 'City 2',
      },
    }
    const response1 = await request(app.server).post('/customer').send(input1)
    expect(response1.status).toBe(201)

    const response2 = await request(app.server).post('/customer').send(input2)
    expect(response2.status).toBe(201)

    const listResponseXML = await request(app.server)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()
    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`,
    )
    expect(listResponseXML.text).toContain(`<customers>`)
    expect(listResponseXML.text).toContain(`<customer>`)
    expect(listResponseXML.text).toContain(`<name>${input1.name}</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(
      `<street>${input1.address.street}</street>`,
    )
    expect(listResponseXML.text).toContain(
      `<city>${input1.address.city}</city>`,
    )
    expect(listResponseXML.text).toContain(
      `<number>${input1.address.number}</number>`,
    )
    expect(listResponseXML.text).toContain(`<zip>${input1.address.zip}</zip>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customer>`)
    expect(listResponseXML.text).toContain(`<name>James</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(
      `<street>${input2.address.street}</street>`,
    )
    expect(listResponseXML.text).toContain(
      `<city>${input2.address.city}</city>`,
    )
    expect(listResponseXML.text).toContain(
      `<number>${input2.address.number}</number>`,
    )
    expect(listResponseXML.text).toContain(`<zip>${input2.address.zip}</zip>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customers>`)
  })

  it('should find a customer', async () => {
    const input: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const response = await request(app.server).post('/customer').send(input)
    expect(response.status).toBe(201)

    const findResponse = await request(app.server)
      .get(`/customer/${response.body.id}`)
      .send()

    expect(findResponse.status).toBe(200)
    expect(findResponse.body.name).toBe(input.name)
    expect(findResponse.body.address.street).toBe(input.address.street)
    expect(findResponse.body.address.number).toBe(input.address.number)
    expect(findResponse.body.address.zip).toBe(input.address.zip)
    expect(findResponse.body.address.city).toBe(input.address.city)
  })

  it('should not find a customer with invalid input', async () => {
    const response = await request(app.server)
      .get(`/customer/invalid-uuid`)
      .send()

    expect(response.status).toBe(404)
  })

  it('should update a customer', async () => {
    const input: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const response = await request(app.server).post('/customer').send(input)
    expect(response.status).toBe(201)

    const update: InputUpdateCustomerDto = {
      id: response.body.id,
      name: 'John 2',
      address: {
        street: 'Street 2',
        number: 321,
        zip: 'Zip 2',
        city: 'City 2',
      },
    }

    const updatedResponse = await request(app.server)
      .put(`/customer`)
      .send(update)

    expect(updatedResponse.status).toBe(200)
    expect(updatedResponse.body.name).toBe(update.name)
    expect(updatedResponse.body.address.street).toBe(update.address.street)
    expect(updatedResponse.body.address.number).toBe(update.address.number)
    expect(updatedResponse.body.address.zip).toBe(update.address.zip)
    expect(updatedResponse.body.address.city).toBe(update.address.city)
  })

  it('should not update a customer with invalid input', async () => {
    const update: InputUpdateCustomerDto = {
      id: 'invalid-id',
      name: 'John',
      address: {
        street: 'Street',
        number: 321,
        zip: 'Zip',
        city: 'City',
      },
    }

    const response = await request(app.server).put(`/customer`).send(update)

    expect(response.status).toBe(404)
  })
})
