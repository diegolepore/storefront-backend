import { Product, ProductStore as store } from '../../models/product'

const product = {
	name: 'Skateboard',
	description: 'ZERO board',
	price: 80,
	category: 'sports'
}
let productId: number | undefined = 0

describe('📦 Product Model suite', () => {

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('create method should add a product', async () => {
    const result: Product | undefined = await store.create({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    })

    if(result) {      
      productId = result.id
      expect(result.name).toBe(product.name)
      expect(result.description).toBe(product.description)
      expect(result.price).toBe(product.price)
      expect(result.category).toBe(product.category)
    }
  })

  it('index method should return a list of products', async () => {
    const result: Product[] | undefined = await store.index()
    
    if(result) {
      expect(result.length).toBeGreaterThan(0)
    }
  })

  it('show method should return the correct product', async () => {
    const result: Product | undefined= await store.show(String(productId))

    if(result) {      
      expect(result.id).toBe(productId)
      expect(result.name).toBe(product.name)
      expect(result.description).toBe(product.description)
      expect(result.price).toBe(product.price)
      expect(result.category).toBe(product.category)
    }
  })

  it('delete method should remove the product', async () => {
    const deletedProduct = await store.delete(String(productId))
    const result: Product | undefined= await store.show(String(productId))

    expect(deletedProduct?.name).toBe(product.name)
    expect(result).toBeFalsy()
  })
})