//Dependents
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

//Imports
import './css/base.scss';
import {
        fetchCustomersAPI,
        fetchOneCustomerAPI,
        fetchRoomsAPI,
        fetchBookingAPI,
        postBookingAPI
        } from './apiCalls.js';
import domUpdates from './domUpdates.js';
import {
  logInPage,
  bookingPage,
  navAccount,
  navBooking,
  navLogIn,
  navLogOut,
  mainBookingBtn,
  msgUserName,
  totalSpent,
  calendarForm,
  calendarSubmit,
  roomOptions,
  bookingBtn,
  roomCard,
  bookingGrid,
  passwordInput,
  usernameInput,
  logInForm,
  submitLogIn,
  logInError
} from './domUpdates.js';
import User from './classes/User.js';
import Room from './classes/Room.js';
import Booking from './classes/Booking.js';
import Hotel from './classes/Hotel.js';


//Global Variables
let guestData;
let bookingData;
let roomData;
let booking;
let guests;
let room;
let guest;
let hotel;


const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const fetchData = () => {
  Promise.all([
    fetchCustomersAPI(),
    fetchBookingAPI(),
    fetchRoomsAPI(),
  ]).then(data => pageLoad(data))
}

const pageLoad = (data) => {
  guestData = data[0].customers;
  bookingData = data[1].bookings;
  roomData = data[2].rooms;
  hotel = new Hotel(roomData, bookingData)
}

const instantiateUser = (data) => {
  guest = new User(data)
  console.log('Instantiate User: line 93', guest)
}

const logIn = (event) => {
  event.preventDefault();
  let username = usernameInput.value;
  let password = passwordInput.value;
  let userNameId;
  if (username.startsWith('customer') && password === 'overlook2021') {
    domUpdates.hide([logInError])
    userNameId = parseInt(username.split('customer')[1])
    lookUpGuest(userNameId, password)
  } else {
    domUpdates.show([logInError])
  }
}

const lookUpGuest = (userNameId, password) => {
  fetchOneCustomerAPI(userNameId)
  .then(data => {
    instantiateUser(data)
    domUpdates.displayAccountPage(bookingData, roomData)
  })
  .catch(error => domUpdates.show([logInError]))
}



window.addEventListener('load', fetchData);
navLogIn.addEventListener('click', () => {
  domUpdates.displayLogInPage()
});
navBooking.addEventListener('click', () => {
  domUpdates.displayBookingPage()
});
navAccount.addEventListener('click', () => {
  domUpdates.displayAccountPage(bookingData, roomData)
})
calendarSubmit.addEventListener('click', (event) => {
  domUpdates.accessDate(event)
});
filterRoomsBtn.addEventListener('click', (event) => {
  domUpdates.accessType(event)
});
bookingGrid.addEventListener('click', (event) => {
  domUpdates.bookRoom(event, roomData);
});
submitLogIn.addEventListener('click', (event) => {
  logIn(event);
});

export {guestData, bookingData, roomData, booking, guests, room, guest, hotel, fetchData, instantiateUser}
