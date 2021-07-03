import React from 'react';
import TitleBlock from "../../title-block";
import ContentBlock from "../../content-block";
import styles from "./EnterCode.module.scss";
import Button from "../../button";
import {$api} from "../../../http";
import {useRouter} from "next/router";

const EnterCode: React.FunctionComponent = () => {
    const router = useRouter();

    const [arr, setArr] = React.useState<string[]>(Array(4).fill(''));
    const [loading, setLoading] = React.useState<boolean>(false);
    const disable = React.useMemo(() => arr.some(item => !item), [arr]);

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const id = Number(e.target.id) - 1;
        setArr(state => {
            const newArr = [...state];
            newArr[id] = e.target.value;
            return newArr;
        })
        if (e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus()
        }
    }

    const handlerOnFetch = React.useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        $api.get(`/auth/sms/activate?sms=${arr.join('')}`)
            .then(async () => {
                await router.push('/rooms')
            })
            .catch(e => {
                setLoading(false)
                setArr(['','','',''])
            })
    },[arr,router])

    React.useEffect(() => {
        if (!disable) {
            handlerOnFetch();
        }
        return () => setLoading(false)
    }, [disable, handlerOnFetch])

    return (
        <div className='d-flex align-items-center  flex-column'>
            <TitleBlock title='Введите номер'/>
            {
                !loading ? <ContentBlock className={styles.block}>
                        <div className={styles.inputList}>
                            {
                                arr.map((item, idx) => (
                                    <input
                                        key={`${item}_${idx}`}
                                        type='tel'
                                        placeholder='x'
                                        maxLength={1}
                                        id={`${idx + 1}`}
                                        value={arr[idx]}
                                        onChange={handlerOnChange}
                                    />
                                ))
                            }
                        </div>
                        <Button disabled={disable} onClick={handlerOnFetch}>Next</Button>
                    </ContentBlock> :
                    <div className="text-center">
                        <div className="loader"/>
                        <h3>Активация</h3>
                    </div>
            }

        </div>
    );
};

export default EnterCode;