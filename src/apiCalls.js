const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import fetchData from './scripts.js';

const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => console.log("Customer Error", error))
}

const fetchOneCustomerAPI = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .catch(error => console.log(error))
}

const fetchBookingAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.log("Booking Error", error))
}

const fetchRoomsAPI = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.log("Rooms Error", error))
}

const postBookingAPI = (bookedRoom) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: 1,
      date: currentDate,
      roomNumber: bookedRoom.number
    })
  }).then(response => {
    if(response.ok) {
      console.log('API calls line 38 cool')
      fetchData()
    } else if (!response.ok) {
      console.log('API calls line 40 not okay')
      console.log(response)
    }
  }).then(response => response.json())
    .catch(error => console.log(error))
}


export {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
  fetchBookingAPI,
  fetchRoomsAPI,
  postBookingAPI
};
