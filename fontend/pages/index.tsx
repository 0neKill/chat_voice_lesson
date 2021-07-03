import Welcome from "../components/steps/welcome";
import EnterName from "../components/steps/enter-name";
import React from "react";
import Github from "../components/steps/github/Github";
import ChooseAvatar from "../components/steps/choose-avatar";
import EnterPhone from "../components/steps/enter-phone";
import EnterCode from "../components/steps/enter-code";
import {IUser} from "../types/user";
import {GetServerSideProps} from "next";
import {$api} from "../http";


const stepsComponent: { [key: number]: Function } = {
    0: Welcome,
    1: Github,
    2: EnterName,
    3: ChooseAvatar,
    4: EnterPhone,
    5: EnterCode
}

export interface IMainContext {
    handlerOnClick: () => void;
    handlerSetUser: (userData: IUser) => void,
    handlerSetField: (field: keyof IUser, value: string) => void,
    step: number,
    userData: IUser,
}

const getUserData = (): IUser | null => {
    try {
        return JSON.parse(window.localStorage.getItem('userData') as string);
    } catch (e) {
        return null
    }
}

const getFormStep = () => {
    const json = getUserData();
    if (json) {
        if (json.phone) {
            return 5;
        } else {
            return 4;
        }
    }
    return 0;
}

export const MainContext = React.createContext<IMainContext>({} as IMainContext);
export default function Home() {
    const [step, setStep] = React.useState<number>(0);
    const [userData, setUseDate] = React.useState<IUser>({} as IUser);
    const handlerOnClick = React.useCallback(() => {
        setStep(step => step + 1);
    }, []);
    console.log(1212, userData)
    const handlerSetUser = React.useCallback((userData: IUser) => setUseDate(userData), []);

    const handlerSetField = React.useCallback((field: keyof IUser, value: string) => {
        setUseDate(prevState => ({
            ...prevState,
            [field]: value
        }))
    }, [])


    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const json = getUserData()
            if (json) {
                setUseDate(json)
                setStep(getFormStep())
            }
        }
    }, [])


    React.useEffect(() => {
        window.localStorage.setItem('userData', userData ? JSON.stringify(userData) : '');
    }, [userData])


    const Step = stepsComponent[step]
    return (
        <MainContext.Provider value={{
            handlerOnClick: handlerOnClick,
            handlerSetUser: handlerSetUser,
            handlerSetField: handlerSetField,
            step: step,
            userData: userData,
        }}>
            <Step/>
        </MainContext.Provider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {

        const {data} = await $api.get<IUser>('/auth/me',{
            headers: {
                Cookie: `${context.req.headers.cookie}`
            },
        });
        console.log(data)
        return {
            props: {},
            redirect: {
                destination: '/rooms',
                permanent: false
            }
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}
