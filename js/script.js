'use strict';
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
