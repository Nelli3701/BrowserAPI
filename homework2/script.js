'use strict';
const imgData = JSON.parse(images);
console.log(imgData);
const carouselInnerEl = document.querySelector('.carousel-inner');
const carouselIndicatorsEl = document.querySelector('.carousel-indicators');
const nextSlideBtn = document.querySelector('.carousel-control-next');
const prevSlideBtn = document.querySelector('.carousel-control-prev');
let countImg = 0;
let countBtn = 0;
const renderSlide = (el) => {
    const slideTemplate = `
    <div class="carousel-item ${countImg === 0? 'active' : ''}">
      <img src="${el.src}" class="d-block w-100" alt="${el.alt}">
    </div>
    `;
    carouselInnerEl.insertAdjacentHTML('beforeend', slideTemplate);
    countImg++;
}
const renderNavBtn = () => {
    const navBtnTemplate = `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${countBtn}" class="${countBtn === 0? 'active' : ''}" aria-current="true" aria-label="Slide ${countBtn}"></button>
    `;
    carouselIndicatorsEl.insertAdjacentHTML('beforeend', navBtnTemplate);
    countBtn++;
}
imgData.forEach(element => {
    renderSlide(element);
    renderNavBtn();
});

nextSlideBtn.addEventListener('click', (e) => {
    const carouselItemActiveEl = document.querySelector('.carousel-item.active');
    const carouselIndicatorActiveEl = carouselIndicatorsEl.querySelector('button.active');
    if (carouselItemActiveEl.nextElementSibling) {
        carouselItemActiveEl.classList.remove('active');
        carouselItemActiveEl.nextElementSibling.classList.add('active');
        carouselIndicatorActiveEl.classList.remove('active');
        carouselIndicatorActiveEl.nextElementSibling.classList.add('active');
    } else {
        carouselItemActiveEl.classList.remove('active');
        carouselInnerEl.firstElementChild.classList.add('active');
        carouselIndicatorActiveEl.classList.remove('active');
        carouselIndicatorsEl.firstElementChild.classList.add('active');
    }
});
prevSlideBtn.addEventListener('click', (e) => {
    const carouselItemActiveEl = document.querySelector('.carousel-item.active');
    const carouselIndicatorActiveEl = carouselIndicatorsEl.querySelector('button.active');
    if (carouselItemActiveEl.previousElementSibling) {
        carouselItemActiveEl.classList.remove('active');
        carouselItemActiveEl.previousElementSibling.classList.add('active');
        carouselIndicatorActiveEl.classList.remove('active');
        carouselIndicatorActiveEl.previousElementSibling.classList.add('active');
    } else {
        carouselItemActiveEl.classList.remove('active');
        carouselInnerEl.lastElementChild.classList.add('active');
        carouselIndicatorActiveEl.classList.remove('active');
        carouselIndicatorsEl.lastElementChild.classList.add('active');
    }
});
const carouselIndicatorEls = carouselIndicatorsEl.querySelectorAll('button');
carouselIndicatorEls.forEach(button => button.addEventListener('click', (e) => {
    const numb = e.target.getAttribute('data-bs-slide-to');
    carouselIndicatorEls.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    carouselInnerEl.querySelectorAll('.carousel-item').forEach(item => item.classList.remove('active'));
    carouselInnerEl.querySelectorAll('.carousel-item')[numb].classList.add('active');
}))