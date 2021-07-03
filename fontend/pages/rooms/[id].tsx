import React from 'react';
import Header from "../../components/header";
import Image from "next/image";
import styles from "../../styles/pages/Profile.module.scss";
import ContentBlock from "../../components/content-block";
import clsx from "clsx";
import Link from 'next/link';
import {GetServerSideProps} from "next";
import {$api} from "../../http";
import {IUser} from "../../types/user";
import {useRouter} from "next/router";
import {useSocket} from "../../hooks/useSocket";
import disconnect from "../../utils/disconnectScket";
import Peer from 'simple-peer';

type RoomProps = {
    data: {
        id: number;
        title: string;
        speakers: string;
        listenerCount: number;
    }
    userData: IUser,
}

// let peers: Array<{ peer: any, id: number }> = []
const Room: React.FunctionComponent<RoomProps> = ({
                                                      data,
                                                      userData
                                                  }) => {
    const [users, setUsers] = React.useState<Array<IUser>>([]);
    const socket = useSocket();
    const router = useRouter();
    const peers: Array<{ peer: any, id: number }> = React.useMemo(() => [], [])
    const users2 = React.useRef<Array<IUser>>([]);
    React.useEffect(() => {
        if (socket) {

            navigator.mediaDevices.getUserMedia({
                audio: true,
            }).then(stream => {
                users2.current.forEach(speaker => {
                    if (+userData.id !== +speaker.id && !peers.find(obj => +obj.id !== +speaker.id)) {
                        const peerInCome = new Peer({
                            initiator: true,
                            trickle: false,
                            stream: stream,
                        })
                        peerInCome.on('signal', (data) => {
                            socket.emit('CLIENT@ROOM::CALL', {
                                targetUserId: speaker.id,
                                callerUserId: userData.id,
                                roomId: router.query.id,
                                signal: data,
                            })
                            peers.push({
                                peer: peerInCome,
                                id: +speaker.id
                            })
                        });
                    }
                })


                socket.on('SERVER@ROOM::SIGNAL', ({
                                                      targetUserId,
                                                      callerUserId,
                                                      signal: callerSignal,
                                                  }: { targetUserId: string, callerUserId: string, signal: string }) => {
                    const peerOutCome = new Peer({
                        initiator: false,
                        trickle: false,
                        stream: stream
                    })
                    peerOutCome.signal(callerSignal);
                    peerOutCome
                        .on('signal', (outSignal) => {
                            socket.emit('CLIENT@ROOM::ANSWER', {
                                targetUserId: callerUserId,
                                callerUserId: targetUserId,
                                roomId: router.query.id,
                                signal: outSignal,
                            })
                        })
                        .on('stream', async (stream) => {
                            const audio = new Audio();
                            audio.srcObject = stream;
                            await audio.play();
                            // document.querySelector('audio')!.srcObject = stream;
                            // document.querySelector('audio')!.play();

                        })

                })

                socket.on('SERVER@ROOM::ANSWER', ({
                                                      callerUserId,
                                                      signal
                                                  }: { callerUserId: string, signal: string }) => {
                    const obj = peers.find(obj => +obj.id === +callerUserId);
                    if (obj) {
                        obj.peer.signal(signal)
                    }
                })
            }).catch(e => {
                console.log('Нет микро')
            })
        }
        return () => {
        }
    }, [peers, router.query.id, socket, userData.id, users2])
    // React.useEffect(() => {
    //
    //     if (typeof window !== undefined && socket) {
    //
    //         (async function () {
    //             try {
    //
    //                 const stream = await navigator.mediaDevices.getUserMedia({
    //                     audio: true,
    //                 })
    //                 users.forEach(speaker => {
    //                     if (+userData.id !== +speaker.id && !peers.find(obj => +obj.id !== +speaker.id)) {
    //                         const peerInCome = new Peer({
    //                             initiator: true,
    //                             trickle: false,
    //                             stream: stream,
    //                         })
    //                         peerInCome.on('signal', (data) => {
    //                             socket.emit('CLIENT@ROOM::CALL', {
    //                                 targetUserId: speaker.id,
    //                                 callerUserId: userData.id,
    //                                 roomId: router.query.id,
    //                                 signal: data,
    //                             })
    //                             peers.push({
    //                                 peer: peerInCome,
    //                                 id: +speaker.id
    //                             })
    //                         });
    //                     }
    //                 })
    //
    //
    //                 socket.on('SERVER@ROOM::SIGNAL', ({
    //                                                       targetUserId,
    //                                                       callerUserId,
    //                                                       signal: callerSignal,
    //                                                   }: { targetUserId: string, callerUserId: string, signal: string }) => {
    //                     const peerOutCome = new Peer({
    //                         initiator: false,
    //                         trickle: false,
    //                         stream: stream
    //                     })
    //                     peerOutCome.signal(callerSignal);
    //                     peerOutCome
    //                         .on('signal', (outSignal) => {
    //                             socket.emit('CLIENT@ROOM::ANSWER', {
    //                                 targetUserId: callerUserId,
    //                                 callerUserId: targetUserId,
    //                                 roomId: router.query.id,
    //                                 signal: outSignal,
    //                             })
    //                         })
    //                         .on('stream', (stream) => {
    //                             console.log(stream)
    //                         })
    //
    //                 })
    //
    //                 socket.on('SERVER@ROOM::ANSWER', ({
    //                                                       callerUserId,
    //                                                       signal
    //                                                   }: { callerUserId: string, signal: string }) => {
    //                     const obj = peers.find(obj => +obj.id === +callerUserId);
    //                     if (obj!.peer) {
    //                         obj!.peer.signal(signal)
    //                     }
    //                 })
    //             } catch (e) {
    //                 console.log(e)
    //                 console.log('Нет доступа к микрофону!');
    //             }
    //         })()
    //     }
    // }, [users, router.query, userData, socket])

    React.useEffect(() => {
        if (socket) {
            console.log('i am here')
            socket.emit('CLIENT@ROOM::USER_JOIN', {roomId: router.query.id, user: userData});
            socket.on('SERVER@ROOM::USER_LEAVE', (user: IUser) => {
                setUsers(state => state.filter(item => item.id !== user.id))
            })
            socket.on('SERVER@ROOM::USER_JOINED', (users: IUser[]) => {
                setUsers(users)
                users2.current = users;
            })


        }
    }, [router.query, userData, socket])


    return (
        <>
            <Header userData={userData}/>
            {/*<audio controls/>*/}
            <div className='title container d-flex align-items-center justify-content-between'>
                <Link href='/rooms' passHref>
                    <div className='d-flex align-items-center cup' style={{maxWidth: `200px`}}>
                        <Image src="/images/arrow-back.svg" alt="nack" width={30} height={30}/>
                        <h3 className={styles.arrow_back}>Все комнаты</h3>
                    </div>
                </Link>
            </div>
            <ContentBlock className={clsx('m-auto', styles.block)}>
                <h3>{data.title}</h3>
                <div className='d-flex'>
                    {
                        users.map(user => (
                            <div className={styles.image} key={user.id}>
                                <Image width={100} height={100} src={user.avatarUrl} alt={'123'}/>
                                <h5>{user.userName}</h5>
                            </div>
                        ))
                    }
                </div>
                <hr/>

            </ContentBlock>
        </>
    );
};
export default Room;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const {data} = await $api.get('/rooms/' + ctx.params!.id, {
            headers: {
                Cookie: `${ctx.req.headers.cookie}`
            },
        });
        const {data: user} = await $api.get<IUser>('/auth/me', {
            headers: {
                Cookie: `${ctx.req.headers.cookie}`
            },
        });
        return {
            props: {
                data: data,
                userData: user
            },
        }
    } catch (e) {
        console.log(e)
        return {
            props: {},
            redirect: {
                destination: '/rooms',
            }
        }
    }
}