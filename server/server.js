require('dotenv').config()
const fetch = require('node-fetch');
// const express = require('express');
// const app = express();

const params = {
  origin: 'http://localhost:3000',
//   ip: '',
  token: process.env.TOKEN
}

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