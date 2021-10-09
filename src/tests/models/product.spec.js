import { Product, ProductStore as store } from '../../models/product'

const product = {
	name: 'Skateboard',
	description: 'ZERO board',
	image_url: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36827_24756a33-907f-4a5a-ac95-73ce492104e7.jpg',
	price: 80,
	category: 'sports'
}
let productId = 0

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
    const result = await store.create({
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: product.price,
      category: product.category
    })

    if(result) {      
      productId = result.id
      expect(result.name).toBe(product.name)
      expect(result.description).toBe(product.description)
      expect(result.image_url).toBe(product.image_url)
      expect(result.price).toBe(product.price)
      expect(result.category).toBe(product.category)
    }
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    
    if(result) {
      expect(result.length).toBeGreaterThan(0)
    }
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(String(productId))

    if(result) {      
      expect(result.id).toBe(productId)
      expect(result.name).toBe(product.name)
      expect(result.description).toBe(product.description)
      expect(result.image_url).toBe(product.image_url)
      expect(result.price).toBe(product.price)
      expect(result.category).toBe(product.category)
    }
  })

  it('delete method should remove the product', async () => {
    const deletedProduct = await store.delete(String(productId))
    const result = await store.show(String(productId))

    expect(deletedProduct?.name).toBe(product.name)
    expect(result).toBeFalsy()
  })
})