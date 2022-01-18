//Imports
import './css/base.scss';
import {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
  fetchRoomsAPI,
  fetchBookingAPI,
} from './apiCalls.js';
import domUpdates from './domUpdates.js';
import {
  navAccount,
  navBooking,
  navLogIn,
  calendarSubmit,
  bookingGrid,
  passwordInput,
  usernameInput,
  logInForm,
  submitLogIn,
  logInError,
  filterRoomsBtn
} from './domUpdates.js';
import User from './classes/User.js';
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

const instantiateGuest = (data) => {
  guest = new User(data)
  domUpdates.displayAccountPage(bookingData, roomData, guest)

}

const logIn = (event) => {
  event.preventDefault();
  let username = usernameInput.value;
  let password = passwordInput.value;
  let userNameId;
  if (username.startsWith('customer') && password === 'overlook2021') {
    domUpdates.hide([logInError])
    userNameId = parseInt(username.split('customer')[1])
    lookUpGuest(userNameId)
  } else {
    domUpdates.show([logInError])
  }
}

const lookUpGuest = (userNameId) => {
  fetchOneCustomerAPI(userNameId)
  .then(data => {
    instantiateGuest(data)
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
  domUpdates.displayAccountPage(bookingData, roomData, guest)
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

export {guestData, bookingData, roomData, booking, guests, room, guest, hotel, fetchData, instantiateGuest}
