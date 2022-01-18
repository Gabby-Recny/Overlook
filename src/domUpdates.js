const homePage = document.getElementById('homePage');
const accountDashboard = document.getElementById('accountDashboard');
const logInPage = document.getElementById('logInPage');
const bookingPage = document.getElementById('bookingPage');
const roomsPage = document.getElementById('roomsPage');
const navAccount = document.getElementById('navAccount');
const navBooking = document.getElementById('navBookNow');
const navViewRooms = document.getElementById('navViewRooms');
const navLogOut = document.getElementById('navLogOut');
const navLogIn = document.getElementById('navLogIn');
const mainBookingBtn = document.getElementById('mainBookingBtn');
const msgUserName = document.getElementById('msgUserName');
const totalSpent = document.getElementById('totalSpent');
const calendarSubmit = document.getElementById('calendarSubmit');
const calendarForm = document.getElementById('date');
let upcomingRoomsGrid = document.getElementById('upcomingRoomsGrid');
let pastRoomGrid = document.getElementById('pastRoomGrid')
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
const bookingGrid = document.getElementById('bookingGrid');
const filteredRooms = document.getElementById('filteredRooms');
const filterRoomsBtn = document.getElementById('filterRoomsBtn');
const roomOptions = document.getElementById('roomOptions');
const bookingBtn = document.querySelector('.booking-btn');
const roomCard = document.querySelector('.room-card');


import {
  guestData,
  bookingData,
  roomData,
  bookings,
  // rooms,
  // booking,
  // guests,
  room,
  guest,
  hotel,
} from './scripts.js';
import {postBookingAPI }from './apiCalls.js';



const domUpdates = {

    hide(elements) {
      elements.forEach(element => element.classList.add('hidden'));
    },

    show(elements) {
      elements.forEach(element => element.classList.remove('hidden'));
    },

    displayHomePage() {
      domUpdates.show([homePage, mainBookingBtn]);
      domUpdates.hide([
        logInPage,
        bookingPage,
        roomsPage,
        accountDashboard,
      ]);
    },
    displayBookingPage() {
      domUpdates.show([bookingPage]);
      domUpdates.hide([
        logInPage,
        roomsPage,
        homePage,
        accountDashboard,
      ]);
    },
    displayRoomsPage() {
      domUpdates.show([roomsPage]);
      domUpdates.hide([
        homePage,
        logInPage,
        bookingPage,
        accountDashboard,
      ]);
    },
    displayLogInPage() {
      domUpdates.show([logInPage]);
      domUpdates.hide([
        homePage,
        bookingPage,
        roomsPage,
        accountDashboard,
      ]);
    },
    displayAccountPage() {
      domUpdates.show([accountDashboard]);
      domUpdates.hide([
        homePage,
        bookingPage,
        roomsPage,
        logInPage
      ]);
      domUpdates.displayUserInfo(bookingData, roomData)
    },
    displayUserInfo(bookingData, roomData) {
      guest.getUserBookings(bookingData);
      guest.calculateTotalSpent(bookingData, roomData);
      msgUserName.innerText = `${guest.name}!`;
      totalSpent.innerHTML = `${guest.calculateTotalSpent(bookingData, roomData)}`;
      domUpdates.displayPastBookings(bookingData, roomData);
      domUpdates.displayUpcomingBookings(bookingData, roomData);
    },
    displayPastBookings(bookingData, roomData) {
      let guestBookings = guest.getPastBookings(currentDate, bookingData);
      guestBookings.forEach(booking => {
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
      upcomingGuestBookings.forEach(booking => {
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
    if(event.target.className === 'booking-btn') {
      let bookedRoom = roomData.find(room => {
        return room.number === parseInt(event.target.id)
      })
      domUpdates.createReservation(bookedRoom)
    }
  },
  createReservation(bookedRoom) {
    setTimeout(() => {
      postBookingAPI(bookedRoom)
    }, 500)
    // postBookingAPI(bookedRoom)
  },
  displayReservations() {
    console.log('Inside reservations')
    bookingGrid.innerHTML = '';
    bookingGrid.innerHTML += `<article class='loader'></article>`
    console.log('line 213')
    domUpdates.displaySuccessfulResMsg()
    // setTimeout(domUpdates.displaySuccessfulResMsg, 3000)
    console.log('Thank you for booking with us.')
  },
  displaySuccessfulResMsg() {
    bookingGrid.innerHTML = ''
    bookingGrid.innerHTML += `<h2 class='post-booking-message'>Thank you for booking with us! We're so excited to have you!</h2>`
  },
  displayErrorMsg(error) {
    bookingGrid.innerHTML = ''
    bookingGrid.innerHTML += "HELP"
  }
}

export default domUpdates;
export {
  navLogIn,
  navBooking,
  navViewRooms,
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
};
