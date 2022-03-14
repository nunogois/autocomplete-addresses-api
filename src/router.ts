import { Router } from 'express'
import fs from 'fs'
import Searchable from './searchable'
const router = Router()

// / endpoint, welcome message, simply return a string to be rendered as HTML by the browser
router.get('/', (_, res) => {
  res.send(
    'Check out <a href="https://github.com/nunogois/autocomplete-addresses-api" target="_blank">autocomplete-addresses-api</a> for more information.'
  )
})

const addresses = JSON.parse(
  fs.readFileSync('./src/data/addresses.json', 'utf8')
) as Address[] // Read the JSON file and parse it.
const searchable = new Searchable(addresses) // Initialize the searchable object with the addresses

// /search endpoint, returning the list of addresses that match
router.get('/search/:query', async (req, res) => {
  const { query } = req.params // Use destructuring to get the query param from the request: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  if (!query || query.length < 3)
    return res
      .status(400)
      .send(
        'Query parameter is required and should have be at least 3 characters long.'
      )

  res.json(searchable.search(query).slice(0, 20)) // Return the first 20 results
})

export default router
