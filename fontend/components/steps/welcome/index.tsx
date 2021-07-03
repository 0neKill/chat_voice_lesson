import React from 'react';
import ContentBlock from "../../content-block";
import styles from './Welcome.module.scss';
import Button from "../../button";
import Image from 'next/image';
import useGetContext from "../../../hooks/useGetContext";

type WelcomeProps = {
    className?: string
}
const Welcome: React.FunctionComponent<WelcomeProps> = () => {
    const {handlerOnClick} = useGetContext();
    return (
        <ContentBlock className={styles.block}>
            <h3 className={styles.title}>
                <Image className={styles.img} src="/images/hand.png" alt="Cel" width={40} height={40}/>
                Welcome to Chat!
            </h3>
            <p>
                Hey, we`re still opening up but anyone can join with an invite from an existing user!
            </p>
            <div>
                <Button onClick={handlerOnClick}>
                    Get your username
                    <Image src="/images/arrow.png" alt="Vercel Logo" className='d-ib ml-10' width={20} height={20}/>
                </Button>
            </div>
        </ContentBlock>
    );
};

export default Welcome;