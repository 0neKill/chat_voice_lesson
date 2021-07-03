import React from 'react';
import Header from "../../components/header";
import Button from "../../components/button";
import Card from "../../components/card";
import Link from 'next/link'
import {GetServerSideProps, NextPage} from "next";
import {$api} from "../../http";
import {IUser} from "../../types/user";
import Modal from "../../components/modal";
import useInput from "../../hooks/useInput";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {addRooms, fetchCreateRoom, setRoomsListener } from "../../redux/slices/roomsSlice";
import {IReducerMain, wrapper} from "../../redux/store";
import {addUser} from "../../redux/slices/userSlice";
import {useSocket} from "../../hooks/useSocket";
import disconnect from "../../utils/disconnectScket";

type RoomsProps = {
    // rooms: Array<{ id: string, title: string, listenerCount: string }>
    // userData: IUser,
}
const Rooms: NextPage<RoomsProps> = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const {rooms, user} = useSelector((state: IReducerMain) => state)
    const roomValue = useInput('');
    const router = useRouter();
    const socket = useSocket();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        const data = await dispatch(fetchCreateRoom({
            title: roomValue.value,
            speakers: ''
        }))
        console.log(data)
        await router.push(`/rooms/${(data as any).payload.id}`)
    }

    React.useEffect(() => {
        if (socket) {
            socket.on('SERVER@ROOM::HOME', ({users, roomId}: { users: IUser[], roomId: string }) => {
                dispatch(setRoomsListener({users, roomId}));
            })

        }
    }, [socket, dispatch])

    if (rooms.loading) {
        return <div className='loader'/>
    }
    return (
        < >
            <Header userData={user.userData}/>
            <div className='title container d-flex align-items-center justify-content-between'>
                <h1>Все комнаты</h1>
                <Button color='green' onClick={() => setOpen(true)}>+Create</Button>
            </div>
            {
                open && <Modal onClick={onSubmit} roomValue={roomValue}/>
            }
            <div className='container block d-flex list'>
                {rooms.items.length > 0 && (rooms.items).map((item, idx) => (
                    <Link key={item.id}
                          href={'/rooms/' + item.id} passHref>
                        <a>
                            <Card title={item.title} listenerCount={item.listenerCount}/>
                        </a>
                    </Link>
                ))}
            </div>
            <style jsx>{`
              .title {
                margin-top: 40px;

              }

              .card {
                margin-top: 20px;
                margin-left: 10px;
              }

              .list {
                flex-wrap: wrap;
              }
            `}</style>
        </>
    );
};

export default Rooms;


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    try {
        // if(context.req) {
        //     $api.defaults.headers.get.Cookie = context.req.headers.cookie;
        // }
        const {data} = await $api.get<IUser>('/auth/me', {
            headers: {
                Cookie: `${context.req.headers.cookie}`
            },
        });
        await store.dispatch(await addUser(data))
        const {data: rooms} = await $api.get('/rooms/', {
            headers: {
                Cookie: `${context.req.headers.cookie}`
            },
        })
        console.log(rooms)

        await store.dispatch(await addRooms(rooms))
        return {
            props: {
                //     // rooms: rooms,
                //     userData: data
            }
        }
    } catch (e) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }


})