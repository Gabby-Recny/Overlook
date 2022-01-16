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

import {
  guestData,
  bookingData,
  roomData,
  bookings,
  rooms,
  booking,
  guests,
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
    console.log("BOOKING PAGE")
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
    guest.calculateTotalSpent(bookingData, roomData)
    msgUserName.innerText = `${guest.name}!`;
    totalSpent.innerHTML = `${guest.calculateTotalSpent(bookingData, roomData)}`
    domUpdates.displayPastBookings(bookingData, roomData)
  },
  accessDate(event) {
    event.preventDefault();
    console.log(calendarForm.value)
  },
  displayPastBookings(bookings, rooms) {
   console.log("DISPLAY PAST BOOKINGS")
   let guestBookings = guest.sortBookings();
   console.log(guestBookings)
   pastBookings.innerHTML += `
   <article class='past-room-card'>
     // <img class='past-room-photo' src="${room.image}"  alt="Photo of the ${room.type}">
     <div class='past-booking-info'>
       <p id='pastDate'>${booking.date}</p>
       <p id='pastRoomType'>${room.type}</p>
       <p id'pastCost'>$${room.costPerNight} per night</p>
     </div>
   </article>
   `
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
