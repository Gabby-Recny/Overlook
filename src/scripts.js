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
} from './domUpdates.js';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const fetchData = () => {
  console.log("PAGE LOAD")
  Promise.all([
    fetchCustomersAPI(),
    fetchOneCustomerAPI(2),
    fetchBookingAPI(),
    fetchRoomsAPI(),
  ]).then(data => pageLoad(data))
}

const pageLoad = (data) => {
  console.log(data)

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
