// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetchCustomersAPI from './apiCalls.js';
import fetchOneCustomerAPI from './apiCalls.js';
import domUpdates from './domUpdates.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const pageLoad = () => {
  console.log("PAGE LOAD")
  getCustomersAPI()
}

const getCustomersAPI = () => {
  console.log("FETCH CUSTOMERS", fetchCustomersAPI())
}

window.addEventListener('load', pageLoad);
navLogIn.addEventListener('click', displayLogInPage);
navViewRooms.addEventListener('click', displayRoomsPage);
navBooking.addEventListener('click', displayBookingPage);
