const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {fetchData} from './scripts.js';

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
  console.log("MAKE USER ID DYNAMIC APICALLS:LINE 36")
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: 50,
      date: currentDate,
      roomNumber: bookedRoom.number
    })
  }).then(response => {
    if(response.ok) {
      fetchData()
      return response.json()
    } else if (!response.ok) {
      throw new Error(`Error: ${response.body}`)
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
