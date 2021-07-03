import React from 'react';
import styles from './Modal.module.scss';
import Button from "../button";
import useInput from "../../hooks/useInput";

interface ModalProps {
    onClick: () => void;
    roomValue: {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value: string
    }
}

const Modal: React.FunctionComponent<ModalProps> = ({onClick, roomValue}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modal__details}>
                <h1 className={styles.modal__title}>Назовите комнату</h1>
                <input
                    className={styles.input}
                    {...roomValue}
                />
            </div>
            <Button className={styles.modal__btn} onClick={onClick}>Button &rarr;</Button>
        </div>
    );
};

export default Modal;