const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_BASE = 'https://incas-functions-dev-b8djeyakc7d0hwa3.australiasoutheast-01.azurewebsites.net/api';

app.get('/api/:endpoint', async (req, res) => {
  try {
    const url = `${API_BASE}/${req.params.endpoint}${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Proxy running at http://localhost:5000'));
