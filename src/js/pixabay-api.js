const API_KEY = '48226590-99b6af351d6e3a0b674791be6';
const URL_PIXABAY = 'https://pixabay.com/api/';

export const fetchImages = (query, perPage = 12) => {
  const urlFetch = `${URL_PIXABAY}?key=${API_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;


  return fetch(urlFetch)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
};