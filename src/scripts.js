// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
// export isSameOrAfter = require(‘dayjs/plugin/isSameOrAfter');
// import dayjs from '../scripts.js';
// import currentDate from '../scripts.js';
// import isSameOrAfter from ‘../scripts.js';
import './css/base.scss';
import {
        fetchCustomersAPI,
        fetchOneCustomerAPI,
        fetchRoomsAPI,
        fetchBookingAPI,
        } from './apiCalls.js';
import domUpdates from './domUpdates.js';
import {
  logInPage,
  bookingPage,
  roomsPage,
  navAccount,
  navBooking,
  navViewRooms,
  navLogIn,
  navLogOut,
  mainBookingBtn,
  msgUserName,
  totalSpent,
  calendarForm,
  calendarSubmit,
  checkboxDropdownList,
} from './domUpdates.js';
import User from './classes/User.js';
import Room from './classes/Room.js';
import Booking from './classes/Booking.js';

let guestData;
let bookingData;
let roomData;
let bookings;
let rooms;
let booking;
let guests;
let room;
let guest;


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const fetchData = () => {
  console.log("PAGE LOAD")
  Promise.all([
    fetchCustomersAPI(),
    fetchBookingAPI(),
    fetchRoomsAPI(),
  ]).then(data => pageLoad(data))
    // .catch(error => console.log(error))
}

const pageLoad = (data) => {
  console.log(data)
  guestData = data[0].customers;
  bookingData = data[1].bookings;
  roomData = data[2].rooms;
  // instantiateRoom(roomData)
  // instanstiateBooking(bookingData)
  instantiateGuest(guestData)
}

// const instanstiateBooking = (bookingData) => {
//   bookings = [];
//   bookingData.forEach(bookingObj => {
//     booking = new Booking(bookingObj);
//     bookings.push(booking);
//   });
//   return bookings;
// }
//
// const instantiateRoom = (roomData) => {
//   const rooms = [];
//   roomData.forEach(roomObj => {
//     room = new Room(roomObj);
//     rooms.push(room);
//   });
//   console.log('line 91', rooms)
//   return rooms;
// }

const instantiateGuest = (guestData) => {
  guests = [];
  guestData.forEach(guestObj => {
    guest = new User (guestObj);
    guests.push(guest);
  });
  const title = document.querySelector('.title');
  title.innerHTML = guests[2].name
  // user = new User(data[0][getRandomIndex(data[0])]);
  // return guests;
}

export {guestData, bookingData, roomData, bookings, rooms, booking, guests, room, guest}

window.addEventListener('load', fetchData);
navLogIn.addEventListener('click', () => {
  domUpdates.displayLogInPage()
});
navViewRooms.addEventListener('click', () => {
  domUpdates.displayRoomsPage()
});
navBooking.addEventListener('click', () => {
  domUpdates.displayBookingPage()
});
navAccount.addEventListener('click', () => {
  domUpdates.displayAccountPage(bookingData, roomData)
})
calendarSubmit.addEventListener('click', () => {
  domUpdates.accessDate(event)
});
roomTypeDropdown.addEventListener('click', () => {
  roomTypeDropdown.classList.toggle("is-active");
});
checkboxDropdownList.addEventListener('click', (event) => {
  event.stopPropagation();
});
