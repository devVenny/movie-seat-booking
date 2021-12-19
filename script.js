"use strict";

const container = document.querySelector(".container");
const movies = document.getElementById("movies");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
let ticketPrice = +movies.value;

const SELECTED__CLASSNAME = "selected";
const SELECTEDMOVIEINDEX__CN = "selectedMovieIndex";
const SELECTEDMOVIEPRICE__CN = "selectedMoviePrice";

function populateUI() {
  // Save selected seat
  const selectedSeats = JSON.parse(localStorage.getItem(SELECTED__CLASSNAME)); // 데이터 꺼내오기
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add(SELECTED__CLASSNAME);
      }
    });
  }

  // Save chosen movie
  const selectedMovieIndex = localStorage.getItem(SELECTEDMOVIEINDEX__CN); // ls에서 인덱스 숫자를 가져온다
  if (+selectedMovieIndex !== null) {
    // 데이터에 뭔가 있다면
    movies.selectedIndex = +selectedMovieIndex; // select에서 선택된 인덱스는 가져온 인덱스를 할당
  }

  // Save total
  const selectedMoviePrice = localStorage.getItem(SELECTEDMOVIEPRICE__CN);
  count.innerHTML = selectedSeats.length;
  total.innerHTML = selectedSeats.length * selectedMoviePrice;
}
populateUI();

// Save to LS
function saveToLS(indexArr) {
  localStorage.setItem(SELECTED__CLASSNAME, JSON.stringify(indexArr));
}

// Update total and count
function updateSelectedCount() {
  const selectedSeat = container.querySelectorAll(".seat.selected");
  const selectedSeatLength = selectedSeat.length;
  count.innerHTML = selectedSeatLength;
  total.innerHTML = selectedSeatLength * ticketPrice;

  const newSelectedSeat = [...selectedSeat].map((seat) => {
    return [...seats].indexOf(seat);
  });
  saveToLS(newSelectedSeat);
}

// Set movie index and movie price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem(SELECTEDMOVIEINDEX__CN, movieIndex);
  localStorage.setItem(SELECTEDMOVIEPRICE__CN, moviePrice);
}

// Update movie price
movies.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  const selectedMovie = e.target.selectedIndex;
  setMovieData(selectedMovie, ticketPrice);
  updateSelectedCount();
});

// Click event listener
container.addEventListener("click", (e) => {
  const classList = e.target.classList;
  if (classList.contains("seat") && !classList.contains("ocuupied")) {
    e.target.classList.toggle(SELECTED__CLASSNAME); // className 이 "seat"인 요소에 "selected"를 toggle한다.
    updateSelectedCount();
  }
});
