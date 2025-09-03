import { getImages } from "./data.js";

const galleryContainer = document.querySelector(".container__gallery");
const btnImage = document.querySelector(".item__btn");

document.addEventListener("DOMContentLoaded", generateMarkup);

async function generateMarkup() {
  const data = await getImages();
  galleryContainer.innerHTML = "";

  data.map((img) => {
    const { id, title, url, images } = img;
    const thumbnail = images.preview_gif.url;
    const fullGif = images.original.url;

    const markup = `
    <figure class="gallery_item" data-id="${id}">
        <picture class="image__container">
        <img
            class="img"
            src="${thumbnail}"
        />
        </picture>
        <figcaption class="item__content">
            <h3 class="item__title">${title}</h3>
            <button class='item__btn'>Ver imagen</button>
        </figcaption>
    </figure>
    `;

    galleryContainer.insertAdjacentHTML("beforeend", markup);
  });
}
