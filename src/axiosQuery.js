import axios from "axios";
import Notiflix from "notiflix";
export async function axiosQuery(name, number) {
  return await axios({
		method: "GET",
		url: 'https://pixabay.com/api/',
		params: {
			key: '26610249-d0ecba3c93167ffebf2a906f0',
			q: name,
			image_type: 'photo',
			orientation: 'horizontal',
			safesearch: 'true',
			page: number,
			per_page: 40,
		}
  })
}

export function showResults(resp) {
  if (resp.data.total == 0) {
		Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
	} else {
		for (const result of resp.data.hits) {
			const divGallery = document.querySelector(".gallery");
			const divPhotoCard = document.createElement("div");
			divPhotoCard.classList.add("photo-card");
			const divPhotoCardFragment = document.createDocumentFragment();
			const divInfoFragment = document.createDocumentFragment();
			const imgLink = document.createElement("a");
			imgLink.insertAdjacentHTML("beforeend", `<img src=${result.webformatURL} alt=${result.tags} loading="lazy">`);
			imgLink.setAttribute("href", result.largeImageURL);
			const divInfo = document.createElement("div");
			divInfo.classList.add("info");
			const pLikes = document.createElement("p");
			pLikes.classList.add("info-item");
			pLikes.insertAdjacentHTML("beforeend", `<b>Likes: </b>${result.likes}`);
			const pViews = document.createElement("p");
			pViews.classList.add("info-item");
			pViews.insertAdjacentHTML("beforeend", `<b>Vievs: </b>${result.views}`);
			const pComments = document.createElement("p");
			pComments.classList.add("info-item");
			pComments.insertAdjacentHTML("beforeend", `<b>Comments: </b>${result.comments}`);
			const pDownloads = document.createElement("p");
			pDownloads.classList.add("info-item");
			pDownloads.insertAdjacentHTML("beforeend", `<b>Downloads: </b>${result.downloads}`);
			divInfoFragment.append(pLikes, pViews, pComments, pDownloads);
			divInfo.append(divInfoFragment);
			divPhotoCardFragment.append(imgLink, divInfo);
			divPhotoCard.append(divPhotoCardFragment);
			divGallery.append(divPhotoCard);
		}
	}
}