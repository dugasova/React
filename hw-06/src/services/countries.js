import axios from 'axios';
const API = `https://679286cdcf994cc6804a5368.mockapi.io/countries`;
// const API = `https://restcountries.com/v3.1/all`;

const countries = {
  get: (id) => axios(API + (id ? `/${id}` : ``)).then(({data}) => data),
  delete: (id) => axios.delete(API + `/${id}`).then(({data}) => data),
};

export default countries;