import React from 'react';
import styles from './Button.module.scss';
import clsx from "clsx";

const colors = {
    green: styles.green,
    gray: styles.gray,
    blue: styles.blue
}

type ButtonProps = {
    disabled?: boolean,
    color?: keyof typeof colors,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {

    return <button type='button'
                   className={clsx(props.className, styles.button, props.color && colors[props.color])} {...props}/>;
};

export default Button;