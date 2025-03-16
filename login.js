// Login script for both consumer and merchant

// Consumer elements
const consumerWrapper = document.querySelector('.consumer-wrapper');
const consumerLoginLink = document.querySelector('.consumer .login-link');
const consumerRegisterLink = document.querySelector('.consumer .register-link');
const consumerLoginBtn = document.querySelector('.consumer-login');
const consumerIconClose = document.querySelector('.consumer .icon-close');

// Merchant elements
const merchantWrapper = document.querySelector('.merchant-wrapper');
const merchantLoginLink = document.querySelector('.merchant .login-link');
const merchantRegisterLink = document.querySelector('.merchant .register-link');
const merchantLoginBtn = document.querySelector('.merchant-login');
const merchantIconClose = document.querySelector('.merchant-close');

// Consumer event listeners
consumerRegisterLink.addEventListener('click', ()=> {
    consumerWrapper.classList.add('active');
});

consumerLoginLink.addEventListener('click', ()=> {
    consumerWrapper.classList.remove('active');
});

consumerLoginBtn.addEventListener('click', ()=> {
    consumerWrapper.classList.add('active-popup');
});

consumerIconClose.addEventListener('click', ()=> {
    consumerWrapper.classList.remove('active-popup');
});

// Merchant event listeners
merchantRegisterLink.addEventListener('click', ()=> {
    merchantWrapper.classList.add('active');
});

merchantLoginLink.addEventListener('click', ()=> {
    merchantWrapper.classList.remove('active');
});

merchantLoginBtn.addEventListener('click', ()=> {
    merchantWrapper.classList.add('active-popup');
});

merchantIconClose.addEventListener('click', ()=> {
    merchantWrapper.classList.remove('active-popup');
});