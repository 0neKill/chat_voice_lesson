import React from 'react';

type TitleBlockProps = {
    title: string
}
const TitleBlock: React.FunctionComponent<TitleBlockProps> = ({title}) => {
    return <h1>{title}</h1>
};

export default React.memo(TitleBlock);