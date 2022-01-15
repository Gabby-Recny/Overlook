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
    ]);
  },
  displayBookingPage() {
    domUpdates.show([bookingPage]);
    domUpdates.hide([
      logInPage,
      roomsPage,
      homePage,
    ]);
    console.log("BOOKING PAGE")
  },
  displayRoomsPage() {
    domUpdates.show([roomsPage]);
    domUpdates.hide([
      homePage,
      logInPage,
      bookingPage,
    ]);
  },
  displayLogInPage() {
    domUpdates.show([logInPage]);
    domUpdates.hide([
      homePage,
      bookingPage,
      roomsPage,
    ]);
  },
};

export default domUpdates;
  export {navLogIn, navBooking, navViewRooms, mainBookingBtn};
