const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => console.log(error))
}

const fetchOneCustomerAPI = () => {
  return fetch: `http://localhost:3001/api/v1/customers/${id}`
  .then(response => response.json())
  .catch(error => console.log(error))
}

export default {
  fetchCustomersAPI,
  fetchOneCustomerAPI,
};
