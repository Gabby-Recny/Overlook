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
  roomOptions
} from './domUpdates.js';
import User from './classes/User.js';
import Room from './classes/Room.js';
import Booking from './classes/Booking.js';
import Hotel from './classes/Hotel.js';


//Global Variables
let guestData;
let bookingData;
let roomData;
let bookings;
let rooms;
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
    // .catch(error => console.log(error))
}

const pageLoad = (data) => {
  guestData = data[0].customers;
  bookingData = data[1].bookings;
  roomData = data[2].rooms;
  instantiateData(guestData, roomData, bookingData)
}

const instantiateData = (guestData, roomData, bookingData) => {
  instantiateHotel (roomData, bookingData)
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
//   return rooms;
// }

const instantiateGuest = (guestData) => {
  guests = [];
  guestData.forEach(guestObj => {
    guest = new User (guestObj);
    guests.push(guest);
  });
}

const instantiateHotel = (roomData, bookingData) => {
  hotel = new Hotel(roomData, bookingData)
}

export {guestData, bookingData, roomData, bookings, rooms, booking, guests, room, guest, hotel}

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
calendarSubmit.addEventListener('click', (event) => {
  domUpdates.accessDate(event)
});
filterRoomsBtn.addEventListener('click', (event) => {
  domUpdates.accessType(event)
})
