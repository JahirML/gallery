import { getImages } from "./data.js";

const galleryContainer = document.querySelector(".container__gallery");
const btnImage = document.querySelector(".item__btn");
const sliderContainer = document.querySelector(".slider__container");
const sliderBtn = document.querySelector(".slider__btn");
const overlay = document.querySelector(".overlay");

// document.addEventListener("DOMContentLoaded", StartApp);
let allFullGif = [];
let currentIndex;
StartApp();
async function StartApp() {
  const data = await getImages();
  galleryContainer.innerHTML = "";
  // sliderContainer.innerHTML = "";
  allFullGif = data;
  console.log(allFullGif);

  data.map((img) => {
    const { id, title, thumbnail } = img;

    const markup = `
    <figure class="gallery_item gallery_item--active " data-id="${id}">
        <picture class="image__container">
        <img
          loading="lazy"
            class="img"
            src="${thumbnail}"
        />
        </picture>
        <figcaption class="item__content">
            <h3 class="item__title">${title}</h3>
            <button  class='item__btn'>Ver imagen</button>
        </figcaption>
    </figure>
    `;

    galleryContainer.insertAdjacentHTML("beforeend", markup);
  });
  renderModalImages();
}

function renderModalImages() {
  sliderContainer.innerHTML = "";
  allFullGif.map((gif) => {
    const { id, title, fullGift } = gif;

    const html = `
    <figure class="slide" data-id="${id}">
      <picture class="slide__picture">
        <img
          class="slide__img"
          src="${fullGift}"
          alt="${title}"
          loading="lazy"
        />
      </picture>
      <figcaption class="slide__content">
        <h3 class="slide__title">${title}</h3>
      </figcaption>
    </figure>
    `;
    sliderContainer.insertAdjacentHTML("beforeend", html);
  });
}

galleryContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("item__btn")) return;

  const figure = e.target.closest(".gallery_item");
  const id = figure.dataset.id;
  currentIndex = id;
  overlay.classList.remove("hidden");
  slider();
});

// Cerrar el modal
sliderBtn.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.classList.add("hidden");
});

function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  console.log(slides);

  const maxSlide = slides.length;
  let currSlide = +currentIndex;

  function createDots() {
    dotContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = `
    <button class="dots__dot" data-slide="${i}"></button>
    `;
      dotContainer.insertAdjacentHTML("beforeend", dot);
    });
  }
  function activeDot(slideIndex) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
      .classList.add("dots__dot--active");
  }

  function nextPage() {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else currSlide++;
    goToPage(currSlide);
    activeDot(currSlide);
  }

  function prevPage() {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else currSlide--;

    goToPage(currSlide);
    activeDot(currSlide);
  }

  function goToPage(index) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - index)}%)`)
    );
  }

  btnRight.addEventListener("click", nextPage);
  btnLeft.addEventListener("click", prevPage);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
    else return;
  });

  function init() {
    goToPage(currSlide);
    createDots();
    activeDot(currSlide);
  }
  init();
}
