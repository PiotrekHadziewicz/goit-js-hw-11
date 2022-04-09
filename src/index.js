import Notiflix from "notiflix";
import { axiosQuery, showResults } from "./axiosQuery";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const searchForm = document.querySelector(".search-form");
const searchQuery = document.querySelector(`input[name="searchQuery"]`);
const galleryDiv = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");
loadMore.style.display = "none";
let pageNumber = 1;

const lightbox = new SimpleLightbox('.gallery div a', { 
    captionSelector: 'img',
    captionsData: 'alt',
	captionDelay: 250,
});

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	galleryDiv.innerHTML = "";
	pageNumber = 1;
	loadMore.style.display = "inline";
	axiosQuery(searchQuery.value, pageNumber)
		.then(resp => {
			showResults(resp);
			const { height: cardHeight } = document.querySelector('.gallery')
  			.firstElementChild.getBoundingClientRect();
			window.scrollBy({
  				top: cardHeight * 2,
  				behavior: 'smooth',
			});
			lightbox.refresh();
			Notiflix.Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);
			if (resp.data.totalHits % 40 != 0) { 
				if (pageNumber == parseInt(resp.data.totalHits / 40) + 1) {
					loadMore.style.display = "none";
					Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
				}
			} else if (pageNumber == resp.data.totalHits / 40) {
				loadMore.style.display = "none";
				Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
			}
		})
		.catch(error => { 
			console.log(error);
		});
});

loadMore.addEventListener("click", () => { 
	pageNumber += 1;
	axiosQuery(searchQuery.value, pageNumber)
		.then(resp => { 
			showResults(resp);
			const { height: cardHeight } = document.querySelector('.gallery')
  			.firstElementChild.getBoundingClientRect();
			window.scrollBy({
  				top: cardHeight * 2,
  				behavior: 'smooth',
			});
			lightbox.refresh();
			if (resp.data.totalHits % 40 != 0) { 
				if (pageNumber == parseInt(resp.data.totalHits / 40) + 1) {
					loadMore.style.display = "none";
					Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
				}
			} else if (pageNumber == resp.data.totalHits / 40) {
				loadMore.style.display = "none";
				Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
			}
		})
		.catch(error => { 
			console.log(error);
		});
});