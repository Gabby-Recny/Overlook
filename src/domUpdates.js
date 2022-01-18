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
let pastRoomsGrid = document.getElementById('pastRoomsGrid');
let upcomingRoomsGrid = document.getElementById('upcomingRoomsGrid');
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
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


import {
  bookingData,
  roomData,
  guest,
  hotel,
} from './scripts.js';
import {
  postBookingAPI
} from './apiCalls.js';



const domUpdates = {

  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  reset(elements) {
    elements.forEach(element => element = '');
  },
  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

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
    console.log('domupdates line 80', guest)
    domUpdates.show([accountDashboard]);
    domUpdates.hide([
      homePage,
      bookingPage,
      logInPage
    ]);
    domUpdates.displayUserInfo(bookingData, roomData, guest)
  },
  displayUserInfo(bookingData, roomData, guest) {
    console.log('dom line 89', guest)
    guest.getUserBookings(bookingData)
    guest.calculateTotalSpent(bookingData, roomData);
    msgUserName.innerText = `${guest.name}!`;
    totalSpent.innerHTML = `${guest.calculateTotalSpent(bookingData, roomData)}`;
    domUpdates.displayPastBookings(bookingData, roomData);
    domUpdates.displayUpcomingBookings(bookingData, roomData);
  },
  displayPastBookings(bookingData, roomData) {
    let guestBookings = guest.getPastBookings(currentDate, bookingData);
    let sortedBookings = guest.sortDescendingBookings(guestBookings)

    pastRoomsGrid.innerHTML = '';

    sortedBookings.forEach(booking => {
      let pastRoom = roomData.find(room => room.number === booking.roomNumber);
      pastRoomsGrid.innerHTML += `
        <article class='past-room-card'>
          <img class='past-room-photo' src="https://loremflickr.com/640/360"  alt="${pastRoom.roomType}">
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
    let sortedBookings = guest.sortAscendingBookings(upcomingGuestBookings)
    upcomingRoomsGrid.innerHTML = '';
    sortedBookings.forEach(booking => {
      let room = roomData.find(room => room.number === booking.roomNumber);
      upcomingRoomsGrid.innerHTML += `
        <article class='room-card'>
          <div class='booking-info'>
            <p id='upcomingDate'>${booking.date}</p>
            <p id='upcomingRoomType'>${room.roomType}</p>
          </div>
            <img class='room-photo' src="https:/loremflickr.com/640/360"  alt="Random Photo">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${room.costPerNight} per night</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${room.numBeds} ${room.bedSize}</h3>
          </div>
        </article>`
    })
  },
  displayApologies() {
    bookingGrid.innerText += ` It appears we have no rooms available that match your criterea. We would love to have you stop by! Try changing your date or room preferances.`
  },
  accessDate(event) {
    event.preventDefault();
    let date = calendarForm.value.split(' ').join('/')
    domUpdates.displayRoomsByDate(date)
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
          <img class='room-photo' src="https://loremflickr.com/640/360"  alt="${room.roomType}">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${room.costPerNight}</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${room.numBeds} ${room.bedSize}</h3>
          </div>
        <button class='booking-btn' id='${room.number}'>BOOK NOW</button>
      </article>`
    })
  },
  accessType() {
    event.preventDefault()
    domUpdates.displayRoomType(roomOptions.value)
  },
  displayRoomType(roomType) {
    hotel.findRoomsByType(roomType)
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
          <img class='room-photo' src="https://loremflickr.com/640/360"  alt="${room.roomType}">
          <div class='cost-and-bed-type'>
            <h3 id='upcomingCost'>$${room.costPerNight}</h3>
            <h3 class='room-bed-type' id='upcomingBedType'>${room.numBeds} ${room.bedSize}</h3>
          </div>
        <button class='booking-btn' id='${room.number}'>BOOK NOW</button>
      </article>`
    })
  },
  bookRoom(event, roomData) {
    if (event.target.className === 'booking-btn') {
      let bookedRoom = roomData.find(room => {
        return room.number === parseInt(event.target.id)
      })
      domUpdates.createReservation(bookedRoom)
    }
  },
  createReservation(bookedRoom) {
    bookingGrid.innerHTML = '';
    bookingGrid.innerHTML += `<article class='loader'></article>`
    setTimeout(() => {
      postBookingAPI(bookedRoom)
    }, 2000)
  },
  displaySuccessfulResMsg() {
    bookingGrid.innerHTML = ''
    bookingGrid.innerHTML += `<h2 class='post-booking-message'>Thank you for booking with us! We're so excited to have you!</h2>`
    setTimeout(() => {
      domUpdates.displayUpcomingBookings(bookingData, roomData)
      domUpdates.displayAccountPage(bookingData, roomData, guest)
    }, 3500)
  },
  displayErrorMsg() {
    bookingGrid.innerHTML = ''
    bookingGrid.innerHTML += `<h2 class='post-booking-message'>Ruh roh, something went go. Go back and try again!</h2>`
    setTimeout(() => {
      domUpdates.displayBookingPage()
    }, 3500)
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
  logInError
};
