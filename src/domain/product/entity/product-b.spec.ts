import { describe, expect, it } from '@jest/globals'

import { ProductB } from './product-b'

describe('Product-B unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new ProductB('', 'Product 1', 100)
    }).toThrowError('product: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new ProductB('123', '', 100)
    }).toThrowError('product: Name is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new ProductB('123', 'Name', -1)
    }).toThrowError('product: Price must be greater than zero')
  })

  it('should change name', () => {
    const product = new ProductB('123', 'Product 1', 100)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should change price', () => {
    const product = new ProductB('123', 'Product 1', 100)
    const price = 150
    product.changePrice(price)
    expect(product.price).toBe(price * 2)
  })
})
