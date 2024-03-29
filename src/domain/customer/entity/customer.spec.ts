import { describe, expect, it } from '@jest/globals'

import { Address } from '../value-object'

import { Customer } from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'Bruno')
    }).toThrowError('customer: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '')
    }).toThrowError('customer: Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('123', 'Bruno')
    customer.changeName('Gabriel')
    expect(customer.name).toBe('Gabriel')
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address({
      street: 'Street',
      number: 1,
      zip: 'Zip',
      city: 'City',
    })
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1')

      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
