import React from 'react';
import styles from './ContentBlock.module.scss';
import clsx from "clsx";

type ContentBlockProps = {
    className?: string
}
const ContentBlock: React.FunctionComponent<ContentBlockProps> = ({
                                                                      children,
                                                                      className
                                                                  }) => {
    return <div className={clsx(styles.block, className)}> {children}</div>
};

export default ContentBlock;