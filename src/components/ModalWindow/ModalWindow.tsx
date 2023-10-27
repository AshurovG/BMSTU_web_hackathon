import React, { MouseEvent, MouseEventHandler } from 'react';
import cn from 'classnames'
import styles from './ModalWindow.module.scss';
import Button from 'components/Button';
import ProfileLogoIcon from 'components/icons/ProfileLogoIcon';
import { Link } from 'react-router-dom';

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active: boolean;
    setActive: (value: boolean) => void;
    children: React.ReactNode;
    className?: string;
};

const ModalWindow: React.FC<ModalProps> = ({
    active,
    setActive,
    children,
    className
}) => {

    const handleClick: MouseEventHandler<HTMLDivElement> = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };
    //   className={cn(styles.modal, className)}
    return (
        <div onClick={() => setActive(false)} className={`${styles.modal} ${active === true ? styles.active : ''}`}>
            <div onClick={handleClick} className={active === false ? cn(styles.modal__content, className) : cn(styles.modal__content, styles.active, className)}>
                {children}
            </div>
        </div>
    )
};

export default ModalWindow;