import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let query = '';
let page = 1;
const perPage = 15;

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({ message: 'Sorry, no images found!' });
      return;
    }

    createGallery(data.hits);

if (data.totalHits <= perPage) {
  hideLoadMoreButton();
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
  });
} else {
  showLoadMoreButton();
}
  } catch (error) {
    iziToast.error({ message: 'Error fetching images!' });
  } finally {
    hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading more images!' });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}