class Searchable {
  items: SearchableItem[]

  constructor(items: Address[] = []) {
    this.items = items.map(item => new SearchableItem(item))
  }

  search(query: string): Address[] {
    return this.items
      .filter(item => item.matches(query))
      .map(item => item.address)
  }
}

class SearchableItem {
  address: Address
  terms: string[] = []

  constructor(address: Address) {
    Object.values(address).forEach(value => {
      this.terms.push(value.toString().toLowerCase())
    })
    this.address = address
  }

  matches(query: string): boolean {
    return this.terms.some(term => term.includes(query.toLowerCase()))
  }
}

export default Searchable
