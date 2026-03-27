// jib elements mn HTML
const form = document.getElementById('form');
const username = document.getElementById('username');
const age = document.getElementById('age');
const url = document.getElementById('url');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');


// function error
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}


// function success
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


// check required
function checkRequired(inputs){
  inputs.forEach(function(input){
    if(input.value.trim() === ''){
      showError(input, input.id + ' is required');
    }else{
      showSuccess(input);
    }
  });
}


// check length
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, input.id + ' khaso ykoun ktar mn ' + min);
  }else if(input.value.length > max){
    showError(input, input.id + ' khaso ykoun 9al mn ' + max);
  }else{
    showSuccess(input);
  }
}


// check email
function checkEmail(input){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(re.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input, 'email machi s7i7');
  }
}


// check password match
function checkPasswordsMatch(pass1, pass2){
  if(pass1.value !== pass2.value){
    showError(pass2, 'passwords makaytchabhoch');
  }
}


// check age
function checkAge(input){
  if(input.value < 1 || input.value > 120){
    showError(input, 'age khaso ykoun bin 1 w 120');
  }else{
    showSuccess(input);
  }
}


// check url
function checkUrl(input){
  const pattern = /^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,}(\/.*)?$/;

  if(pattern.test(input.value)){
    showSuccess(input);
  }else{
    showError(input, 'url machi s7i7');
  }
}


// submit
form.addEventListener('submit', function(e){
  e.preventDefault();

  checkRequired([username, age, url, email, password, confirmpassword]);

  checkLength(username,3,15);
  checkLength(password,6,25);

  checkEmail(email);

  checkPasswordsMatch(password, confirmpassword);

  checkAge(age);

  checkUrl(url);
});