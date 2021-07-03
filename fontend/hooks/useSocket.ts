import React from "react";
import io, {Socket} from "socket.io-client";
import disconnect from "../utils/disconnectScket";

export const useSocket = () => {
    const [socket, setSocket] = React.useState<typeof Socket | null>(null)

    React.useEffect(() => {
        const socketIo = io('http://localhost:8080')

        setSocket(socketIo)

        function cleanup() {
            socketIo.disconnect()
        }

        return cleanup

    }, [])
    React.useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    },[socket])
    return socket
}


// export const useSocket = (): typeof Socket | false => {
//     const ref = React.useRef<typeof Socket | false>(false);
//     if (!ref.current) {
//         ref.current = typeof window !== 'undefined' && io('http://localhost:8080');
//     } else {
//         ref.current.connect();
//     }
//     React.useEffect(() => {
//         return () => {
//             if (ref.current) {
//                 ref.current.disconnect();
//                 // disconnect(ref.current)
//             }
//         }
//     } )
//     // React.useEffect(() => {
//     //     if (socket === null) {
//     //         console.log('ZA:YPA')
//     //         setSocket(io('http://localhost:8080'))
//     //     }
//     //     return () => disconnect(socket)
//     // }, [socket])
//     // console.log('zayi')
//     // return React.useMemo(() => {
//     //     if (ref.current === null && typeof window !== 'undefined') {
//     //         console.log(123)
//     //         ref.current = io('http://localhost:8080');
//     //         return ref.current;
//     //     }
//     //     return ref.current
//     // }, []);
//     // const [socket, setSocket] = React.useState<typeof Socket | null>(null);
//     // React.useEffect(() => {
//     //     if (!socket && typeof window !== undefined) {
//     //         setSocket(io('http://localhost:8080'));
//     //     }
//     // }, [socket])
//
//     return ref.current;
// }