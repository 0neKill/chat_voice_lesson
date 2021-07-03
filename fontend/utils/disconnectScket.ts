import {Socket} from "socket.io-client";

export default function disconnect(socket: typeof Socket | false) {
    if (socket) {
        socket.disconnect();
    }
}