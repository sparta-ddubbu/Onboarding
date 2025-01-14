import axios from 'axios';

// TODO: handle JWT from which storage
const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default clientAxios;
