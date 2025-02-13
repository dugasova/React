import axios from "axios"

const API = `https://api.github.com/users/`;

const service = {
  getUser: (userName) =>
    axios.get(`${API}${userName}`).then(({ data }) => data),
  getUserRepos: (userName) =>
    axios.get(`${API}${userName}/repos?per_page=100`).then(({ data }) => data),
};

export default service;
