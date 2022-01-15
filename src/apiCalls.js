const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => console.log(error))
}

const fetchOneCustomerAPI = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .catch(error => console.log(error))
}

const fetchBookingAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.log(error))
}

const fetchRoomsAPI = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json()
    .then(error => console.log(error))
}


export {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
  fetchBookingAPI,
  fetchRoomsAPI
};
