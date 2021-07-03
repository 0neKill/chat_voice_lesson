import React from 'react';
import ContentBlock from "../../content-block";
import Button from "../../button";
import styles from './EnterName.module.scss'
import TitleBlock from "../../title-block";
import useInput from "../../../hooks/useInput";
import useGetContext from "../../../hooks/useGetContext";

const EnterName: React.FunctionComponent = () => {
    const {handlerOnClick, userData, handlerSetField} = useGetContext()
    const disabled = !userData.fullName;
    return (
        <div className='d-flex align-items-center  flex-column'>
            <TitleBlock title='Как вас зовут?'/>
            <ContentBlock className={styles.block}>
                <input
                    className={styles.input}
                    value={userData.fullName}
                    onChange={(e) => handlerSetField('fullName', e.target.value)}
                />
                <Button disabled={disabled} onClick={handlerOnClick}>Next</Button>
            </ContentBlock>
        </div>
    );
};

export default EnterName;