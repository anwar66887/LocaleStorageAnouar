const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const age = document.getElementById('age');
const url = document.getElementById('url');


// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}


// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


// Check email
function checkEmail(input){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(re.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input,'Email is not valid');
  }
}


// Check required
function checkRequired(inputArr){
  inputArr.forEach(function(input){

    if(input.value.trim() === ''){
      showError(input, `${input.id} is required`);
    }else{
      showSuccess(input);
    }

  });
}


// Check length
function checkLength(input,min,max){

  if(input.value.length < min){
    showError(input,`${input.id} must be at least ${min} characters`);
  }
  else if(input.value.length > max){
    showError(input,`${input.id} must be less than ${max} characters`);
  }
  else{
    showSuccess(input);
  }

}


// Check passwords match
function checkPasswordsMatch(password, confirmpassword){

  if(password.value !== confirmpassword.value){
    showError(confirmpassword,'Passwords do not match');
  }else{
    showSuccess(confirmpassword);
  }

}


// Check age range
function checkRange(input,min,max){

  if(input.value < min || input.value > max){
    showError(input,`Age must be between ${min} and ${max}`);
  }else{
    showSuccess(input);
  }

}


// Check URL
function checkUrl(input){
  const pattern = /^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,}(\/.*)?$/;

  if(pattern.test(input.value)){
    showSuccess(input);
  }else{
    showError(input,'URL is not valid');
  }
}


// Event listener
form.addEventListener('submit', function(e){

  e.preventDefault();

  checkRequired([username,email,password,confirmpassword,age,url]);

  checkLength(username,3,15);
  checkLength(password,6,25);

  checkEmail(email);

  checkPasswordsMatch(password,confirmpassword);

  checkRange(age,0,999);

  checkUrl(url);

});