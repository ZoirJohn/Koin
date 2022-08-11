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
