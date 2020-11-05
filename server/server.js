require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;

const params = {
  origin: process.env.ORIGIN,
  token: process.env.TOKEN
};

const fetchJWT = async () => {
  const response = await fetch(
    'https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const json = await response.json();
    return json;
  };
  
app.use(cors())
app.get('/', async (request, response) => {
  const jwt = await fetchJWT();
  response.send(jwt);
});

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});