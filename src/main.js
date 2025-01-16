import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';


const searchFormEl = document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");
const loader = document.querySelector(".loader");



const onSearchFormSubmit = event => {
  event.preventDefault();

  const query = event.currentTarget.elements.user_query.value.trim();
  if (query === "") {
     iziToast.error({
        message: "Please fill the form",
        position: "topRight",
        
      })

    return;
  }
    
 loader.classList.remove("is-hidden")
  
 fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        });

        galleryEl.innerHTML = "";
        loader.classList.add("is-hidden");
        searchFormEl.reset();
        return;
      }


      renderGallery(data.hits, galleryEl);
      
       loader.classList.add("is-hidden");

      const lightbox = new SimpleLightbox(".gallery a", {captionsData: 'alt', captionDelay: 250 });

      lightbox.refresh();
      
      searchFormEl.reset();
    })
    .catch(err => {
      console.log(err)
      iziToast.error({
        message: "Something went wrong, please try again later.",
        position: "topRight",
      })
      loader.classList.add("is-hidden");
      
    })
  searchFormEl.reset();
}
searchFormEl.addEventListener("submit", onSearchFormSubmit);