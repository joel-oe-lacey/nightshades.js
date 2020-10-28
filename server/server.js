require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express');
const app = express();

const params = {
//   origin: 'YOUR-WEBSITE-URL',
//   ip: 'THE-WEBSITE-USER-IP',
//   token: 'YOUR_TREFLE_TOKEN'
}

(async () => {
  const response = await fetch(
    'https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    });
  const json = await response.json();
  console.log(json);
})();