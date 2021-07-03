import React from 'react';
import TitleBlock from "../../title-block";
import ContentBlock from "../../content-block";
import Button from "../../button";
import useGetContext from "../../../hooks/useGetContext";
import {$api} from "../../../http";


const ChooseAvatar: React.FunctionComponent = () => {
    const {handlerOnClick, userData, handlerSetField} = useGetContext();
    const [image, setImage] = React.useState<string>(userData.avatarUrl || '/images/123123.jpg');
    const [loading, setLoading] = React.useState<boolean>(false)

    const handlerOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = event.target.files as any;
        if (file) {
            try {
                setLoading(true);
                const fileData = new FormData();
                fileData.append('photo', file);
                const {data} = await $api.post<string>('/file/upload', fileData);
                console.log(data)
                // const imageUrl = URL.createObjectURL(file);
                setImage(data);
                handlerSetField('avatarUrl',data);
                event.target.value = ''
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='d-flex align-items-center  flex-column'>
            <TitleBlock title={`Привет, ${userData.fullName}`}/>
            <ContentBlock>
                {
                    !loading ? (
                        <img width={`100%`} height={`100%`}
                             src={image} alt='asd'/>
                    ) : <div className='loader'/>
                }
                <div>
                    <label htmlFor="img" className='link cup'>Выберите картинку</label>
                </div>
                <input type="file" hidden id='img' onChange={handlerOnChange}/>
                <Button onClick={handlerOnClick}>Next</Button>
            </ContentBlock>
        </div>
    );
};

export default ChooseAvatar;