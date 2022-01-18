const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import domUpdates from './domUpdates.js';
import {fetchData} from './scripts.js';
import {guest} from './scripts.js';

const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => domUpdates.displayErrorMsg())
}

const fetchOneCustomerAPI = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
}

const fetchBookingAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => domUpdates.displayErrorMsg())
}

const fetchRoomsAPI = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => domUpdates.displayErrorMsg())
}

const postBookingAPI = (newBooking) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBooking)
  }).then(response => {
    if (response.ok) {
      fetchData()
      guest.upcomingBookings.push(newBooking)
      domUpdates.displaySuccessfulResMsg()
      return response.json()
    } else if (!response.ok) {
      throw new Error(`Error`)
    }
  })
    .catch(error => console.log(error))
}


export {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
  fetchBookingAPI,
  fetchRoomsAPI,
  postBookingAPI
};
