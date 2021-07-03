import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import styles from "../../styles/pages/Profile.module.scss";
import Button from "../button";

type ProfileProps = {
    avatar: string,
    name: string,
    tag: string,
    info: string
}
const Profile: React.FunctionComponent<ProfileProps> = ({
                                                            avatar, tag, name, info
                                                        }) => {
    return (
        <>
            <Link href='/rooms' passHref>
                <div className='d-flex align-items-center cup' style={{maxWidth:`200px`}}>
                    <Image src="/images/arrow-back.svg" alt="nack" width={30} height={30}/>
                    <h3 className={styles.arrow_back}>Back</h3>
                </div>
            </Link>
            <div className='d-flex'>
                <div className='d-flex align-items-center'>
                    <Image src={avatar} alt="nack" width={100} height={100}/>
                    <div className='d-flex flex-column'>
                        <h2 style={{marginBottom: 0, marginTop: 0}}>{name} </h2>
                        <h3 style={{marginBottom: 0, marginTop: 0}}>@{tag}</h3>
                    </div>
                </div>
                <Button color='blue'>Follow</Button>
            </div>
            <p>{info}</p>

        </>
    );
};

export default Profile;