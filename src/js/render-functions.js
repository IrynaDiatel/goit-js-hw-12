import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b>${img.likes}</p>
          <p><b>Views</b>${img.views}</p>
          <p><b>Comments</b>${img.comments}</p>
          <p><b>Downloads</b>${img.downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export const clearGallery = () => (galleryContainer.innerHTML = '');
export const showLoader = () => loader.classList.add('is-visible');
export const hideLoader = () => loader.classList.remove('is-visible');

export const showLoadMoreButton = () => loadMoreBtn.classList.remove('hidden');
export const hideLoadMoreButton = () => loadMoreBtn.classList.add('hidden');