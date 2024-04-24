const express = require('express');
const axios = require('axios');

const router = express.Router();

const OMDB_BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '76297b25'; // Replace 'YOUR_OMDB_API_KEY' with your actual OMDB API key

// Proxy route to forward requests to OMDB API for movie details by IMDb ID
router.get('/movie/:imdbID', async (req, res) => {
  const { imdbID } = req.params;

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        i: imdbID,
        apikey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request to OMDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
