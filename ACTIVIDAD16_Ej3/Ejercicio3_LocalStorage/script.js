const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const coin = document.getElementById('coin');
const movieSelect = document.getElementById('movie');
const currencySelect = document.getElementById('currency-one');

let ticketPrice = +movieSelect.value;
let currency = 'USD';
let rate = 1;


// guardar movie data
function setMovieData(movieIndex){
  localStorage.setItem('selectedMovieIndex', movieIndex);
}



function updateSelectedCount(){

  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;

  total.innerText = (selectedSeatsCount * ticketPrice * rate).toFixed(2);
  coin.innerText = currency;
}


function populateUI(){

  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){

    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });

  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +movieSelect.value; // keep ticketPrice in sync with restored selection
  }

}


function updateSelectMovie(rate, coin){

  const options = movieSelect.querySelectorAll('option');

  options.forEach(option => {

    const basePrice = option.value; 
    const newPrice = (basePrice * rate).toFixed(2);

    const name = option.text.split('(')[0];

    option.text = `${name} (${newPrice} ${coin})`;

  });

}


function getExchangeRate(){

  fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
  .then(res => res.json())
  .then(data => {

rate = currency === 'USD' ? 1 : data.rates[currency];

    updateSelectedCount();
    updateSelectMovie(rate, currency);

  });

}


movieSelect.addEventListener('change', e => {

  setMovieData(e.target.selectedIndex);
  ticketPrice = +e.target.value;

  updateSelectedCount();

});



container.addEventListener('click', e => {

  if(
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ){

    e.target.classList.toggle('selected');

    updateSelectedCount();

  }

});



currencySelect.addEventListener('change', e => {

  currency = e.target.value;

  getExchangeRate();

});


//
populateUI();
updateSelectedCount();
getExchangeRate();