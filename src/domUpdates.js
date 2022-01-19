//*****************DEPENDENCIES**************
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

//***************QUERY SELECTORS**************
const homePage = document.getElementById('homePage');
const accountDashboard = document.getElementById('accountDashboard');
const logInPage = document.getElementById('logInPage');
const bookingPage = document.getElementById('bookingPage');
const navAccount = document.getElementById('navAccount');
const navBooking = document.getElementById('navBookNow');
const navLogIn = document.getElementById('navLogIn');
const mainBookingBtn = document.getElementById('mainBookingBtn');
const msgUserName = document.getElementById('msgUserName');
const totalSpent = document.getElementById('totalSpent');
const calendarSubmit = document.getElementById('calendarSubmit');
const calendarForm = document.getElementById('date');
const bookingGrid = document.getElementById('bookingGrid');
const filteredRooms = document.getElementById('filteredRooms');
const filterRoomsBtn = document.getElementById('filterRoomsBtn');
const roomOptions = document.getElementById('roomOptions');
const bookingBtn = document.querySelector('.booking-btn');
const roomCard = document.querySelector('.room-card');
const logInForm = document.getElementById('logInForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const submitLogIn = document.getElementById('submitLogIn');
const logInError = document.querySelector('.log-in-error');
const requireRoomMsg = document.querySelector('.require-room-msg');
const requireDateMsg = document.querySelector('.require-date-msg');
let pastRoomsGrid = document.getElementById('pastRoomsGrid');
let upcomingRoomsGrid = document.getElementById('upcomingRoomsGrid');


//*****************IMPORTS**************
import {
  bookingData,
  roomData,
  guest,
  hotel,
  createReservation,
} from './scripts.js';
import {
  postBookingAPI
} from './apiCalls.js';

let selectedDate;

const domUpdates = {

//*****************HIDING AND SHOWING**************
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },
//*****************DISPLAY PAGES**************
  displayHomePage() {
    domUpdates.show([homePage, mainBookingBtn]);
    domUpdates.hide([
      logInPage,
      bookingPage,
      accountDashboard,
    ]);
  },
  displayBookingPage() {
    domUpdates.show([bookingPage]);
    domUpdates.hide([
      logInPage,
      homePage,
      accountDashboard,
    ]);
  },
  displayLogInPage() {
    domUpdates.show([logInPage]);
    domUpdates.hide([
      homePage,
      bookingPage,
      accountDashboard,
    ]);
  },
  displayAccountPage(bookingData, roomData, guest) {
    domUpdates.show([accountDashboard]);
    domUpdates.hide([
      homePage,
      bookingPage,
      logInPage
    ]);
    domUpdates.displayUserInfo(bookingData, roomData, guest)
  },
//*****************USER DASHBOARD**************

  displayUserInfo(bookingData, roomData, guest) {
    msgUserName.innerText = `${guest.name}!`;
    totalSpent.innerHTML = `$${guest.calculateTotalSpent(bookingData, roomData)}`;
    domUpdates.displayPastBookings(bookingData, roomData);
    domUpdates.displayUpcomingBookings(bookingData, roomData);
  },
  displayPastBookings(bookingData, roomData) {
    let guestBookings = guest.getPastBookings(currentDate, bookingData);
    let sortedBookings = guest.sortDescendingBookings(guestBookings)

    if (sortedBookings.length === 0) {
      pastRoomsGrid.innerHTML = '';
      pastRoomsGrid.innerHTML += `It looks like you haven't booked a stay with yet! Click the "Book Now" button to get started!`
    }

    pastRoomsGrid.innerHTML = '';
    sortedBookings.forEach(booking => {
      let pastRoom = roomData.find(room => room.number === booking.roomNumber);
      pastRoomsGrid.innerHTML += `
        <article class='past-room-card'>
          <img class='past-room-photo' src="https://loremflickr.com/640/360"  alt="Luxurious and artistic ${pastRoom.roomType} at the Overlook Hotel.">
          <div class='past-booking-info'>
            <p id='pastDate'>${booking.date}</p>
            <p id='pastRoomType'>${pastRoom.roomType}</p>
            <p id'pastCost'>$${pastRoom.costPerNight} per night</p>
          </div>
        </article>
     `
   })
  },
  displayUpcomingBookings(bookingData, roomData) {
    let upcomingGuestBookings = guest.getUpcomingBookings(currentDate, bookingData);
    let sortedBookings = guest.sortAscendingBookings(upcomingGuestBookings);

    if (sortedBookings.length === 0) {
      upcomingRoomsGrid.innerHTML = '';
      upcomingRoomsGrid.innerHTML += `It looks like you haven't booked a stay with yet! Click the "Book Now" button to get started!`
    }

    upcomingRoomsGrid.innerHTML = '';
    sortedBookings.forEach(booking => {
      let selectedRoom = roomData.find(room => {
        return room.number ===  booking.roomNumber
      })
      upcomingRoomsGrid.innerHTML += `
        <article class='room-card'>
          <div class='booking-info'>
            <p id='upcomingDate'>${booking.date}</p>
            <p id='upcomingRoomType'>${selectedRoom.roomType}</p>
          </div>
            <img class='room-photo' src="https:/loremflickr.com/640/360"  alt="Luxurious and artistic ${selectedRoom.roomType} at the Overlook Hotel.">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${selectedRoom.costPerNight} per night</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${selectedRoom.numBeds} ${selectedRoom.bedSize}</h3>
          </div>
        </article>`
    })
  },
//*****************BOOKING  BY DATE   **************
  checkForDate(event) {
    event.preventDefault()
    if (!calendarForm.value) {
      domUpdates.show([requireDateMsg])
    } else {
      domUpdates.hide([requireDateMsg])
      selectedDate = calendarForm.value.split('-').join('/')
      domUpdates.displayRoomsByDate(selectedDate)
    }
  },
  displayRoomsByDate(selectedDate) {
    hotel.findAvailableRooms(selectedDate, bookingData)

    bookingGrid.innerHTML = '';
    if (hotel.availableRooms.length === 0) {
      domUpdates.displayApologies()
    }
    hotel.availableRooms.forEach(room => {
      bookingGrid.innerHTML +=
        `<article class='room-card'>
          <div class='booking-info'>
            <p id='upcomingRoomType'>${room.roomType}</p>
          </div>
          <img class='room-photo' src="https://loremflickr.com/640/360"  alt="Luxurious and artistic ${room.roomType} at the Overlook Hotel.">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${room.costPerNight}</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${room.numBeds} ${room.bedSize}</h3>
          </div>
        <button class='booking-btn' id='${room.number}'>BOOK NOW</button>
      </article>`
    })
  },
  //*****************BOOKING  BY ROOM TYPE   **************
  checkForRoomType(event) {
    event.preventDefault()
    if (roomOptions.value === 'empty') {
      domUpdates.show([requireRoomMsg])
    } else {
      domUpdates.hide([requireRoomMsg])
      domUpdates.displayRoomType(roomOptions.value)
    }
  },
  displayRoomType(roomOptions) {
    hotel.findRoomsByType(roomOptions)
    bookingGrid.innerHTML = '';
    if (hotel.typeOfRooms.length === 0) {
      domUpdates.displayApologies()
    }
    hotel.typeOfRooms.forEach(room => {
      bookingGrid.innerHTML +=
        `<article class='room-card'>
          <div class='booking-info'>
            <p id='upcomingRoomType'>${room.roomType}</p>
          </div>
          <img class='room-photo' src="https://loremflickr.com/640/360"  alt="Luxurious and artistic ${room.roomType} at the Overlook Hotel.">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${room.costPerNight}</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${room.numBeds} ${room.bedSize}</h3>
          </div>
        <button class='booking-btn' id='${room.number}'>BOOK NOW</button>
      </article>`
    })
  },
  //*****************BOOKING **************
  bookRoom(event, roomData) {
    if (event.target.className === 'booking-btn') {
      let bookedRoom = roomData.find(room => {
        return room.number === parseInt(event.target.id)
      })
      createReservation(bookedRoom)
    }
  },
//*****************POST REQUEST**************
  displaySuccessfulResMsg() {
    bookingGrid.innerHTML = '';
    bookingGrid.innerHTML += `<h2 class='post-booking-message'>Thank you for booking with us! We're so excited to have you!</h2>`
    setTimeout(() => {
      bookingGrid.innerHTML = '';
      domUpdates.displayAccountPage(bookingData, roomData, guest)
    }, 3500)
  },
  displayErrorMsg() {
    bookingGrid.innerHTML = '';
    bookingGrid.innerHTML += `<h2 class='post-booking-message'>Ruh roh, something went wrong. Go back and try again!</h2>`
    setTimeout(() => {
      domUpdates.displayBookingPage()
    }, 3500)
  },
  displayLoader() {
    bookingGrid.innerHTML = '';
    bookingGrid.innerHTML += `<article class='loader'></article>`
  },
  displayApologies() {
    bookingGrid.innerText += ` It appears we have no rooms available that match your criterea. We would love to have you stop by! Try changing your date or room preferances.`
  },
  displayRequiredError() {

  }
}

export default domUpdates;
export {
  navLogIn,
  navBooking,
  mainBookingBtn,
  navAccount,
  msgUserName,
  totalSpent,
  calendarForm,
  calendarSubmit,
  bookingGrid,
  filteredRooms,
  filterRoomsBtn,
  roomOptions,
  bookingBtn,
  roomCard,
  passwordInput,
  usernameInput,
  logInForm,
  submitLogIn,
  logInError,
  selectedDate,
};
