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
import User from './classes/User.js';

let randomUser;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


const fetchData = () => {
  Promise.all([
    fetchCustomersAPI(),
    fetchOneCustomerAPI(2),
    fetchBookingAPI(),
    fetchRoomsAPI(),
  ]).then(data => {
    console.log("Customers", data[0])
    console.log("Single Customer", data[1])
    console.log("Bookings", data[2])
    console.log("Rooms", data[3])
    randomUser = new User(data[1]);
    getRandomUser();
  }).catch(error => console.log(error));
  console.log("Random USer", randomUser)

}
// const pageLoad = (data) => {
//   console.log(data)
//   // msgUserName.innerHTML = "MICHA";
//   randomUser = new User(data[0][getRandomIndex(data[0])]);
//   getRandomUser();
//
// }





const msgUserName = document.getElementById('msgUserName');

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const getRandomUser = () => {
    msgUserName.innerHTML = `${randomUser.name}!`;
}

console.log('This is the JavaScript entry file - your code begins here.');

// const fetchData = () => {
//   console.log("PAGE LOAD")
//   Promise.all([
//     fetchCustomersAPI(),
//     fetchOneCustomerAPI(2),
//     fetchBookingAPI(),
//     fetchRoomsAPI(),
//   ]).then(data => pageLoad(data))
// }
//
// const pageLoad = (data) => {
//   console.log(data)
//   // msgUserName.innerHTML = "MICHA";
//   randomUser = new User(data[0][getRandomIndex(data[0])]);
//   getRandomUser();
//
// }


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
