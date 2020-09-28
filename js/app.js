$(document).ready(() => {

// Create Seats UI
createSeats($('#seats'));

// Populate with content from local storage
localStorageContent();

//Add Hover to Seats
/*
$('.seat').not('.selectedSeat').on('mouseover', () => {
$(this).css('background', 'red');
});

$('.seat').not('.selectedSeat').on('mouseleave', () => {
$(this).css({'background' : '#fff'});
});
*/

// Click Event for seats
$('.seat').on('click', bookSeat);
$('#select').on('change', changeMovie);


//Load Items from Local Storage
function localStorageContent() {

//Load Chosen Seats
let seats = $('.seat').get(); //all seats array
let selectedSeats = JSON.parse(window.localStorage.getItem('seats')); //Selected seats

//Checking if selected seats are in local storage + if the array is not empty
if(selectedSeats  !== null && selectedSeats.length > 0) {
seats.forEach((elem, index) => {
if(selectedSeats.indexOf(index) > -1) {
elem.classList.add('selectedSeat');
}
})
}


//Load Select Value
$('#select').val(JSON.parse(window.localStorage.getItem('movie')));
//Load Price
$('.totalPrice').text(JSON.parse(window.localStorage.getItem('price')));
//Load Seats Number
$('.seatsChoice').text(JSON.parse(window.localStorage.getItem('seatsNumber')));

}


//When the movie is changed - remove seats
function changeMovie() {
$('.seat').each((i, e) => {
//$(e).removeClass('selectedSeat');
//$('.seatsChoice').text();
$('.totalPrice').text(parseInt($('.seatsChoice').text()) * parseInt($('select').val()));
window.localStorage.setItem('movie', JSON.stringify(this.value)); //Movie to Localstorage
window.localStorage.setItem('price', JSON.stringify($('.totalPrice').text())); // Price to storage
})
}


// Book a seat
function bookSeat() {
let price = parseInt($('select').val());
$(this).toggleClass('selectedSeat'); //Remove/Add selected class
//$(this).toggleClass('seat');
  if ($(this).hasClass('selectedSeat') && $('.seatsChoice').text() == 0) {
  $('.seatsChoice').text($('.selectedSeat').length);
  $('.totalPrice').text(price);
} else if($(this).hasClass('selectedSeat') && $('.seatsChoice').text() >= 1) {
  $('.seatsChoice').text($('.selectedSeat').length);
  $('.totalPrice').text(parseInt($('.totalPrice').text()) + price);
} else { //Reducing seats and price by one unit
  $('.seatsChoice').text($('.selectedSeat').length);
  $('.totalPrice').text(parseInt($('.totalPrice').text()) - price);
}
   window.localStorage.setItem('seatsNumber', JSON.stringify($('.seatsChoice').text()));
   window.localStorage.setItem('price', JSON.stringify($('.totalPrice').text())); // Price to storage
   selectedSeats();
}


//Define Selected Seats Index
function selectedSeats() {
  let all = $('.seat').get(); //All seats
  let selected = $('.selectedSeat').get(); //Only selected seats
  let seatsIndex = selected.map(item => $('.seat').get().indexOf(item)); //Get Indexes
  window.localStorage.setItem('seats', JSON.stringify(seatsIndex)); //Push seats to localStorage
}


// Create Seats
function createSeats(parent) {
let display = '';
for(let i = 0; i < 6; i++) {
if(i == 0 || i == 3) {
  display += `<div class="row text-white mt-2">

  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="seat mr-2"></div>
  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="seat mr-3"></div>

  </div>`;
} if(i == 1 || i == 4) {
  display += `<div class="row text-white mt-2">

  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="occupiedSeat mr-2"></div>
  <div class="occupiedSeat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="seat mr-3"></div>

  </div>`;

} if(i == 2) {
  display += `<div class="row text-white mt-2">

  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="seat mr-2"></div>
  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="occupiedSeat mr-2"></div>
  <div class="occupiedSeat mr-3"></div>

  </div>`;

} if(i == 5) {
  display += `<div class="row text-white mt-2">

  <div class="seat mr-2"></div>
  <div class="seat mr-4"></div>

  <div class="seat mr-2"></div>
  <div class="seat mr-2"></div>
  <div class="occupiedSeat mr-2"></div>
  <div class="occupiedSeat mr-4"></div>

  <div class="occupiedSeat mr-2"></div>
  <div class="seat mr-3"></div>

  </div>`;
}
}
parent.append(display);
}



























})
