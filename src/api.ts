import axios from 'axios';

const base = process.env.REACT_APP_API_URL;

const api = axios.create({baseURL: base});

export default api;