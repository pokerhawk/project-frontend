import { io } from 'socket.io-client';

const userId = (window.location.href).split('/')[4];
const userType = (window.location.href).split('/')[3];
const viteBase = import.meta.env.VITE_BASE_URL;

// "undefined" means the URL will be computed from the `window.location` object
// in other words, it sets to localhost:5173
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : `${viteBase}?type=${userType}&userId=${userId}`;

const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  timeout: 10000, //10 sec
});

export default socket;
