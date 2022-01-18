const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import domUpdates from './domUpdates.js';
import {fetchData} from './scripts.js';
import {verifiedGuest} from './scripts.js';
import {instantiateUser} from './scripts.js';

const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => domUpdates.displayErrorMsg())
}

const fetchOneCustomerAPI = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  // .then(data => instantiateUser(data))
  // .catch(error => domUpdates.displayErrorMsg())
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

const postBookingAPI = (bookedRoom) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: guest.id,
      date: currentDate,
      roomNumber: bookedRoom.number
    })
  }).then(response => {
    if(response.ok) {
      fetchData()
      domUpdates.displaySuccessfulResMsg()
      return response.json()
    } else if (!response.ok) {
      throw new Error(`Error`)
    }
  })
    .catch(error => domUpdates.displayErrorMsg())
}


export {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
  fetchBookingAPI,
  fetchRoomsAPI,
  postBookingAPI
};
