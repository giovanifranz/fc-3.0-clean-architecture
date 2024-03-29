import { Address } from '@/domain/customer/value-object'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { FindCustomerUseCase } from './find.customer.useCase'
import {
  InputFindCustomerDto,
  OutputFindCustomerDTO,
} from './find.customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'

describe('Integration test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find customer by id', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new FindCustomerUseCase(customerRepository)

    const address = new Address({
      street: 'Street',
      number: 1,
      zip: 'Zip',
      city: 'City',
    })

    const customer = CustomerFactory.createWithAddress({
      name: 'John',
      address,
    })

    await customerRepository.create(customer)

    const input: InputFindCustomerDto = {
      id: customer.id,
    }

    const output: OutputFindCustomerDTO = {
      id: customer.id,
      name: 'John',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: 'Zip',
      },
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
