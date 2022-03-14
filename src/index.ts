import express from 'express' // Use Express to build a very simple API
import router from './router' // Created a separate router file for our endpoints, so I could also import it on our test file
import cors from 'cors' // Added CORS

const app = express()
const port = process.env.PORT || 5000 // Use the PORT environment variable if it exists, otherwise use 5000

app.use(cors()) // Accept all requests from any origin
app.use('/', router) // Use our router from the router file

app.listen(port, () => {
  console.log(
    `autocomplete-addresses-api listening on http://localhost:${port}`
  )
})
