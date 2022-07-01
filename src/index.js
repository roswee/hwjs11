import { fetchImg } from "./js/fetch";
import { renderGallery, galleryBox } from "./js/renders";
import Notiflix, { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// QS

const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');
const form = document.querySelector('form');

let page;
form.addEventListener('submit', searchFn);
loadMoreBtn.addEventListener('click', loadMore);

function searchFn(e) {
    e.preventDefault();
    clearFn();
    page = 1;
    query = input.value.trim();

    if (query==="") {
        Notiflix.Report.failure("Sorry, there are no images matching your search query. Please try again.");
        hide();
        return
    }

        fetchImg(query, page)
        .then(({data}) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.');
            hide()}
            else {
            renderGallery(data.hits);
                lightbox = new SimpleLightbox('.gallery a', {
                    captionsData: 'alt',
                  }).refresh();;
                if (data.totalHits > 40) {
                    unhide()

        }}}
        )
        .catch(error => {
            console.log(error);
          })
          .finally(() => form.reset());
    
    
}

function clearFn() {
    galleryBox.innerHTML = '';
}

function hide() {
    loadMoreBtn.classList.add('is-hidden')
}

function unhide() {
    loadMoreBtn.classList.remove('is-hidden')
}

function loadMore() {
 page+=1;
 fetchImg(query, page)
 .then(({ data }) => {
   renderGallery(data.hits);
   lightbox = new SimpleLightbox('.gallery a', {
     captionsData: 'alt',
   }).refresh();
   smoothScroll();
   const totalPages = data.totalHits / 40;
   if (page > totalPages) {
     hide()
     Notify.failure(
       "We're sorry, but you've reached the end of search results."
     );
   }
 })
 .catch(error => console.log(error));

}

function smoothScroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }