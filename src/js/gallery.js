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
  timeout: 3000,
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

  if (!query) return;

  const {
    data: { totalHits, hits },
  } = await fetchImages({ query });

  if (!hits.length)
    return iziToast.error({
      title: 'Error',
      message: `Sorry, there are no images matching your search query "${query}". Please try again.`,
    });

  iziToast.success({
    message: `Hooray! We found ${totalHits} totalHits images`,
    messageColor: '#fff',
    backgroundColor: '#c139f6',
  });

  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
  const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
  cardHeight = height;

  checkIsLastPage(totalHits);
  lightbox = new SimpleLightbox('.js-list a');
}

async function handleLoadMoreButton() {
  const {
    data: { totalHits, hits },
  } = await fetchImages({ query: null, isLoadMore: true });

  checkIsLastPage(totalHits);

  lightbox.destroy();
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
  lightbox = new SimpleLightbox('.js-list a');

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkIsLastPage(totalHits) {
  const isLastPage = Math.ceil(totalHits / PER_PAGE) === pageNumber;

  refs.loadMoreButton.classList.toggle('hidden', isLastPage);

  isLastPage &&
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
    });
}

refs.form.addEventListener('submit', handleChange);
refs.loadMoreButton.addEventListener('click', handleLoadMoreButton);
