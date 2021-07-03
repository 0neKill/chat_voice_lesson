import React from 'react';
import {useRouter} from "next/router";
import Image from 'next/image';
import styles from '../../styles/pages/Profile.module.scss';
import clsx from "clsx";
import Button from "../../components/button";
import Header from "../../components/header";
import ProfileId from '../../components/profile'
import {GetServerSideProps, NextPage} from "next";
import {$api} from "../../http";
import {IUser} from "../../types/user";

interface ProfileProps {
    userData: IUser
}

const Profile: NextPage<ProfileProps> = ({userData}) => {
    const router = useRouter();

    return (
        <>
            <Header userData={userData}/>
            <div className={clsx(styles.main, 'container')}>
                <ProfileId avatar={userData.avatarUrl} tag={userData.userName} name={userData.fullName}
                           info={String(userData.gitId)}/>
            </div>
        </>
    )
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const {data: user} = await $api.get<IUser>('/auth/me', {
            headers: {
                Cookie: `${context.req.headers.cookie}`
            },
        });
        return {
            props: {
                userData: user
            },
        }
    } catch (e) {
        return {
            props: {},
            redirect: {
                destination: '/rooms'
            }
        }
    }

}