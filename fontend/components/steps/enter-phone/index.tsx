import React from 'react';
import TitleBlock from "../../title-block";
import ContentBlock from "../../content-block";
import NumberFormat from 'react-number-format';
import Button from "../../button";
import styles from './EnterPhone.module.scss';
import clsx from "clsx";
import useGetContext from "../../../hooks/useGetContext";
import {$api} from "../../../http";


type InputValueState = { formattedValue: string, value: string }
const EnterPhone: React.FunctionComponent = () => {
    const {handlerOnClick, handlerSetField} = useGetContext();

    const [numberForm, setNumberForm] = React.useState<InputValueState>({} as InputValueState);
    const nextStep = React.useMemo(() => !numberForm.formattedValue || numberForm.formattedValue.includes('_'), [numberForm]);

    const handlerOnSubmit = async () => {
        try {
            handlerSetField('phone', numberForm.value)
            const {data} = await $api.get<string>(`/auth/sms?phone=${numberForm.value}`);
            console.log(data)
            handlerOnClick()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='d-flex align-items-center  flex-column'>
            <TitleBlock title='Введите номер'/>
            <ContentBlock className={styles.block}>
                <NumberFormat
                    className={clsx(styles.input, 'field')}
                    format='+7 (###) ###-##-##'
                    mask='_'
                    placeholder='+7 (XXX) XXX-XX-XX'
                    value={numberForm.value}
                    onValueChange={e => setNumberForm(e)}
                />
                <Button disabled={nextStep} onClick={handlerOnSubmit}>Next</Button>
            </ContentBlock>
        </div>
    );
};

export default EnterPhone;