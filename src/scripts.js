// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
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

const displayUserInfo = (bookingData, roomData) => {
  guest.calculateTotalSpent(bookingData, roomData)
    msgUserName.innerText = `${guest.name}!`;
    totalSpent.innerHTML = `${guest.calculateTotalSpent(bookingData, roomData)}`
}

const fetchData = () => {
  console.log("PAGE LOAD")
  Promise.all([
    fetchCustomersAPI(),
    fetchBookingAPI(),
    fetchRoomsAPI(),
  ]).then(data => pageLoad(data))
}

const pageLoad = (data) => {
  console.log(data)
  guestData = data[0].customers;
  bookingData = data[1].bookings;
  roomData = data[2].rooms;
  instantiateRoom(roomData)
  instanstiateBooking(bookingData)
  instantiateGuest(guestData)
  displayUserInfo(bookingData, roomData);
}

const instanstiateBooking = (bookingData) => {
  bookings = [];
  bookingData.forEach(bookingObj => {
    booking = new Booking(bookingObj);
    bookings.push(booking);
  });
  return bookings;
}

const instantiateRoom = () => {
  const rooms = [];
  roomData.forEach(roomObj => {
    room = new Room(roomObj);
    rooms.push(room);
  });
  return rooms;
}

const instantiateGuest = (guestData) => {
  guests = [];
  guestData.forEach(guestObj => {
    guest = new User (guestObj);
    guests.push(guest);
  });
  return guests;
}


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
  domUpdates.displayAccountPage()
})
