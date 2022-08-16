'use strict';

// ? Prevent Default
const links = document.querySelectorAll('a');
links.forEach((link) => link.addEventListener('click', preventDefault));
function preventDefault(e) {
   e.preventDefault();
}

// ? Burger
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

// ? Counter
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

// ? Popup
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

// ? Lazy Loading
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

// ? Input Validator
const input = document.getElementById('input-email');
const button = document.getElementById('subscribe');
const placeholder = document.querySelector('.placeholder');
const footer = document.querySelector('.footer');

input.addEventListener('focus', inputCheck);
footer.addEventListener('click', focusOff);
button.addEventListener('click', checkInputValue);

function inputCheck(e) {
   e.preventDefault();
   placeholder.classList.add('toTop_');
}
function focusOff(e) {
   const target = e.target;
   if (target !== input && input.value === '') {
      placeholder.classList.remove('toTop_');
   }
}
function checkInputValue(e) {
   e.preventDefault();
   if (input.value && input.value.search('@') >= 0 && input.value.length >= 10) {
      input.classList.add('right_');
      input.value = '';
      setTimeout(() => {
         input.classList.remove('right_');
      }, 5000);
   } else {
      input.classList.add('error_');
      setTimeout(() => {
         input.classList.remove('error_');
      }, 5000);
   }
}

// ? Parallax
const poster = document.querySelector('.poster');
const decors = document.querySelectorAll('[class*="decor-"]:not(.decor-img)');
const decor = document.querySelector('[class*="decor-"]:not(.decor-img)');

// window.addEventListener('scroll', parallax);
poster.addEventListener('mousemove', parallaxOnHover);

// function parallax() {
//    if (window.screenY >= poster.getBoundingClientRect().bottom) {
//       decors.forEach((decor) => {
//          decor.style.transform = `translate(0,0)`;
//       });
//    }
//    decors.forEach((decor) => {
//       const array = decor.className.split('');
//       decor.style.transform = `translate(0,${window.scrollY * array[array.length - 1] * 0.1}px`;
//    });
// }

function parallaxOnHover(e) {
	const x = e.clientX;
	const y = e.clientY;
	decors.forEach((decor) => {
		const array = decor.className.split('');
		decor.style.transitionDelay = '0';
		decor.style.transition = `all ${250 * array[array.length - 1]}ms ease-out`;
      decor.style.transform = `translate(${-x*0.15}px,${-y*0.2}px`;
   });
}
