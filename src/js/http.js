import axios from 'axios';

const PER_PAGE = 40;
let queryParam = '',
  pageNumber = 1;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '22046149-41a2515b5a783e6a5f4bfbfcc',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

async function fetchImages({ query, isLoadMore = false }) {
  pageNumber = isLoadMore ? pageNumber + 1 : 1;

  queryParam = query ?? queryParam;

  return await axios.get('', {
    params: {
      q: queryParam,
      page: pageNumber,
    },
  });
}

export { fetchImages, pageNumber, PER_PAGE };
