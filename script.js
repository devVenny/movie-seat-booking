"use strict";

const container = document.querySelector(".container");
const movies = document.getElementById("movies");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
let ticketPrice = +movies.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeat = container.querySelectorAll(".seat.selected");
  const selectedSeatLength = selectedSeat.length;

  count.innerHTML = selectedSeatLength;
  total.innerHTML = selectedSeatLength * ticketPrice;
}

// Update movie price
movies.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Click event listener
container.addEventListener("click", (e) => {
  const classList = e.target.classList;
  if (classList.contains("seat") && !classList.contains("ocuupied")) {
    e.target.classList.toggle("selected"); // className 이 "seat"인 요소에 "selected"를 toggle한다.
    updateSelectedCount();
  }
});
