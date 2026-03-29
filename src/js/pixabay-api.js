import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
    const API_KEY = '47477357-395d8a047c7c5012d361fddb9';
    console.log('KEY:', API_KEY);
  const url = 'https://pixabay.com/api/';

  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return response.data;
}