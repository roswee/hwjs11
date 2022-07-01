
const axios = require('axios');

export { fetchImg };

const baseUrl = 'https://pixabay.com';

async function fetchImg(name, page) {
  const params = new URLSearchParams({
    key: '28362795-a7a194b938437c9cbae959d13',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page,
  });
  const response = await axios.get(`${baseUrl}/api/?${params}`);
  return response;
}