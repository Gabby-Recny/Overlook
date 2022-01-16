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
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

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
} from './scripts.js';



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
    console.log(3, 'line 88 domUpdates', bookingData)
    guest.getUserBookings(bookingData);
    guest.calculateTotalSpent(bookingData, roomData);
    msgUserName.innerText = `${guest.name}!`;
    totalSpent.innerHTML = `${guest.calculateTotalSpent(bookingData, roomData)}`
    domUpdates.displayUpcomingBookings(bookingData, roomData)
  },
  accessDate(event) {
    event.preventDefault();
    console.log(calendarForm.value)
  },
  displayUpcomingBookings(bookingData, roomData) {
    console.log(4)
  let guestBookings = guest.getUpcomingBookings(currentDate, bookingData);
  console.log("LINE 104", guestBookings)
   guestBookings.forEach(booking => {
    let room = roomData.filter(room => room.number === booking.roomNumber);
     pastBookings.innerHTML += `
     <article class='past-room-card'>
       <img class='past-room-photo' src="https://loremflickr.com/640/360"  alt="Photo of the ${room.type}>
       <div class='past-booking-info'>
         <p id='pastDate'>${booking.date}</p>
         <p id='pastRoomType'>${room.type}</p>
         <p id'pastCost'>$${room.costPerNight} per night</p>
       </div>
     </article>
     `
   })
 },

};

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
};
