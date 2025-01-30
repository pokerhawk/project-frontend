import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const userId = (window.location.href).split('/')[4];
const userType = (window.location.href).split('/')[3];
const viteBase = import.meta.env.VITE_BASE_URL;
const URL = import.meta.env.NODE_ENV === 'production' ? `${viteBase}?type=${userType}&userId=${userId}` : undefined;

const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false
});

export default socket;
