import Searchable from '../searchable'
import fs from 'fs'

const addresses = JSON.parse(
  fs.readFileSync('./src/data/addresses.json', 'utf8')
) as Address[] // Read the JSON file and parse it.

describe('Searchable - A custom implementation of a searchable object list', () => {
  test('constructor > creates an empty Searchable', async () => {
    const searchable = new Searchable()
    expect(searchable.items).toEqual([])
  })

  test('constructor > creates a Searchable with 1 item, which has searchable terms', async () => {
    const searchable = new Searchable(addresses.slice(0, 1))
    expect(searchable.items[0].address).toEqual(addresses[0])
    expect(searchable.items[0].terms.length).toBeGreaterThan(0)
  })

  test('constructor > creates a Searchable with many items, and all of them have searchable terms', async () => {
    const searchable = new Searchable(addresses)
    expect(searchable.items.map(item => item.address)).toEqual(addresses)
    expect(searchable.items.filter(item => item.terms.length > 0).length).toBe(
      addresses.length
    )
  })
})
