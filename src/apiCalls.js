const fetchCustomersAPI = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .catch(error => console.log(error))
}

export default fetchCustomersAPI;
