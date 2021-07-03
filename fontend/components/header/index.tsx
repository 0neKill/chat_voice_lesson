import React from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import Link from 'next/link';
import {IUser} from "../../types/user";

interface HeaderProps {
    userData: IUser | null
}

const Header: React.FunctionComponent<HeaderProps> = ({
                                                          userData
                                                      }) => {
    return (
        <div>
            <div className={styles.main}>
                <Link href={`/profile/${userData!.gitId}`} passHref>
                    <div className={styles.content}>
                        <h3>{userData!.userName}</h3>
                        <Image width={60} height={60} src={userData!.avatarUrl} alt={'123'}/>
                    </div>
                </Link>
            </div>
            <hr/>
        </div>
    );
};

export default Header;