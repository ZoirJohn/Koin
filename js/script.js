'use strict';

// Prevent Default
const links = document.querySelectorAll('a');
links.forEach((link) => link.addEventListener('click', preventDefault));
function preventDefault(e) {
   e.preventDefault();
}

// Burger
const burger = document.querySelector('.burger');
const body = document.querySelector('body');
const menu = document.querySelector('.menu');
burger.addEventListener('click', function () {
   if (burger && body && menu) {
      burger.classList.toggle('cross_');
      body.classList.toggle('lock_');
      menu.classList.toggle('open_');
   }
});

// Counter
window.addEventListener('load', windowLoad);

function windowLoad() {
   function digitsCountersInit(digitsCounterItems) {
      let digitsCounters = digitsCounterItems ? digitsCounterItems : document.querySelectorAll('[data-digits-counter]');
      if (digitsCounters) {
         digitsCounters.forEach((digitsCounter) => {
            digitsCountersAnimate(digitsCounter);
         });
      }
   }

   function digitsCountersAnimate(digitsCounter) {
      let startTimestamp = null;
      const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 10000;
      const startValue = parseInt(digitsCounter.innerHTML);
      const startPosition = 0;
      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
         if (progress < 1) {
            window.requestAnimationFrame(step);
         }
      };
      window.requestAnimationFrame(step);
   }

   let options = {
      threshold: 0.3,
   };

   let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const targetElement = entry.target;
            const digitsCounterItems = targetElement.querySelectorAll('[data-digits-counter]');

            if (digitsCounterItems.length) {
               digitsCountersInit(digitsCounterItems);
            }
            observer.unobserve(targetElement);
         }
      });
   }, options);

   const sections = document.querySelectorAll('.counter-section');
   if (sections.length) {
      sections.forEach((section) => {
         observer.observe(section);
      });
   }
}

// Popup
const popupOpenButton = document.querySelector('.popup-difference__controls');
const popupCloseButton = document.querySelector('.cross');
const popup = document.querySelector('.popup-block');

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

function popupOpen(e) {
   e.preventDefault();
   if (popupOpenButton && popup) {
      popup.classList.add('open_');
      body.classList.add('lock_');
      if (document.documentElement.clientWidth > 768) {
         body.style.paddingRight = '10px';
         burger.closest('.header').style.paddingRight = '10px';
      }
   }
}
function popupClose() {
   popup.classList.remove('open_');
   body.classList.remove('lock_');
   if (document.documentElement.clientWidth > 767) {
      body.style.paddingRight = '0';
      burger.closest('.header').style.paddingRight = '0';
   }
}

// Lazy Loading
const images = document.querySelectorAll('[data-src]');
const windowHeight = document.documentElement.clientHeight;

let imagesPositions = [];

if (images.length > 0) {
   images.forEach((img) => {
      if (img.dataset.src) {
         imagesPositions.push(img.getBoundingClientRect().top + scrollY + 100);
         loadImages();
      }
   });
}

window.addEventListener('scroll', scrollChecker);

function scrollChecker() {
   if (document.querySelectorAll('[data-src]')) {
      loadImages();
   }
}

function loadImages() {
   let imgIndex = imagesPositions.findIndex((item) => scrollY > item - windowHeight);
   if (imgIndex >= 0) {
      if (images[imgIndex].dataset.src) {
         images[imgIndex].src = images[imgIndex].dataset.src;
         images[imgIndex].removeAttribute('data-src');
      }
      delete imagesPositions[imgIndex];
   }
}
