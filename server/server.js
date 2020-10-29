// require('dotenv').config()
const fetch = require('node-fetch');
// const express = require('express');
// const app = express();

const params = {
  origin: 'http://localhost:3000',
//   ip: '68.197.154.229',
  token: 'kCpt8a54u3_VH15-OQPjwAirxVx0L3TEfy2BYm7eXCY'
}

// console.log('envTest', process.env)
const fetchJWT = async () => {
  const response = await fetch(
    'https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    });
  const json = await response.json();
  console.log(json);
}

fetchJWT();