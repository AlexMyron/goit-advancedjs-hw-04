import { fetchImages, pageNumber, PER_PAGE } from './http';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-list'),
  loadMoreButton: document.querySelector('.js-load-more'),
};
let lightbox, cardHeight;

iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'center',
});

function renderGallery(data) {
  return data
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) =>
        `<a class="photo-card" aria-role="button" href="${largeImageURL}">
          <div class="card-thumb">
            <img src="${webformatURL}" class="card-image" alt="${tags}" height="250" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
        </a>`
    )
    .join('');
}

async function handleChange(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreButton.classList.add('hidden');

  const query = e.target.elements.searchQuery.value.trim();
  const { data } = await fetchImages({ query });

  if (!data?.hits.length)
    return iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });

  iziToast.success({
    message: `Hooray! We found ${data.totalHits} totalHits images`,
    messageColor: '#fff',
    backgroundColor: '#c139f6',
  });

  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
  const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
  cardHeight = height;

  refs.loadMoreButton.classList.remove('hidden');
  lightbox = new SimpleLightbox('.js-list a');
}

async function handleLoadMoreButton() {
  const { data } = await fetchImages({ query: null, isLoadMore: true });

  if (data.totalHits <= pageNumber * PER_PAGE) {
    refs.loadMoreButton.classList.add('hidden');
    return iziToast.error({
      title: 'Error',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  lightbox.destroy();
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
  lightbox = new SimpleLightbox('.js-list a');

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

refs.form.addEventListener('submit', handleChange);
refs.loadMoreButton.addEventListener('click', handleLoadMoreButton);
