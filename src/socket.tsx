import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const userId = (window.location.href).split('/')[4];
const userType = (window.location.href).split('/')[3];
const URL = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:8080?type=${userType}&userId=${userId}`;

const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false
});

export default socket;
