import { io } from 'socket.io-client';

const viteBase = import.meta.env.VITE_BASE_URL;
const nodeEnv = import.meta.env.VITE_NODE_ENV

// "undefined" means the URL will be computed from the `window.location` object
// in other words, it sets to localhost:5173
const URL = nodeEnv === 'production'? undefined: viteBase;

const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  reconnection: true,
  timeout: 10000, //10 sec
});

export default socket;
