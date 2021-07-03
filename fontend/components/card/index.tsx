import React from 'react';
import ContentBlock from "../content-block";
import styles from './Card.module.scss';
import Image from "next/image";

type CardProps = {
    title: string,
    listenerCount:number,

}

const Card: React.FunctionComponent<CardProps> = ({
    title,
    listenerCount,
                                                  }) => {
    return (
        <>
            <div>
                <ContentBlock className={styles.block}>
                    <h3>{title}</h3>
                    <p>Участники {listenerCount}</p>
                </ContentBlock>
            </div>
        </>

    );
};

export default Card;