import React from 'react';
import ContentBlock from "../../content-block";
import Button from "../../button";
import styles from './Twitter.module.scss'
import TitleBlock from "../../title-block";
import useGetContext from "../../../hooks/useGetContext";
import {IUser} from "../../../types/user";
import {isString} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";



const Github: React.FunctionComponent = () => {
    const {handlerOnClick, handlerSetUser} = useGetContext();


    const handlerOnOpenWindow = () => window.open('http://localhost:8080/auth/login', 'Auth', 'width=400,height=500')

    React.useEffect(() => {
        const messageEvent = ({data}: MessageEvent<string | unknown>) => {
            if (typeof data === 'string' && data.includes('gitId')) {
                const userData = JSON.parse(data);
                handlerSetUser(userData);
                handlerOnClick();
            }
        }
        window.addEventListener('message', messageEvent)
        return () => window.removeEventListener('message', messageEvent)
    }, [handlerOnClick, handlerSetUser])

    return (
        <div className='d-flex align-items-center  flex-column'>
            <TitleBlock title='Хотите войти через твиттер?'/>
            <ContentBlock className={styles.block}>
                <div className={styles.image}>
                    <h3>Sa</h3>
                </div>
                <p>Alex White</p>
                <Button onClick={handlerOnOpenWindow}>Import from Twitter</Button>
            </ContentBlock>
        </div>
    );
};

export default Github;