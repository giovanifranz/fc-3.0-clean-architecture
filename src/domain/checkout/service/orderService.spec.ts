import { describe, expect, it } from '@jest/globals'

import { Customer } from '../../customer/entity'
import { Order, OrderItem } from '../entity'

import { OrderService } from './orderService'

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1')
    const item1 = new OrderItem('i1', 'Item 1', 10, 'p1', 1)

    const order = OrderService.placeOrder(customer, [item1])
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'item 1', 100, 'p1', 1)
    const item2 = new OrderItem('i2', 'item 2', 200, 'p2', 2)

    const order1 = new Order('o1', 'c1', [item1])
    const order2 = new Order('o2', 'c1', [item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(500)
  })

  it('should throw an error if order is equal to or less than zero', () => {
    const customer = new Customer('c1', 'Customer 1')
    expect(() => OrderService.placeOrder(customer, [])).toThrowError(
      'Order must have at least one item',
    )
  })
})
