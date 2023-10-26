import * as React from 'react';
import cn from 'classnames'
import styles from './ProfileWindow.module.scss';
import Button from 'components/Button';
import ProfileLogoIcon from 'components/icons/ProfileLogoIcon';
import { Link } from 'react-router-dom';

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    className?: string;
    username: string;
    fullname: string;
};

const ProfileWindow: React.FC<ModalProps> = ({
    username,
    fullname,
    className,
    onClick,

}) => {
    return (
        <div className={cn(styles.modal, className)}>
            <div className={styles.title__block}>
            <ProfileLogoIcon></ProfileLogoIcon>
                <h3 className={styles.modal__title}>Ваш профиль</h3>
            </div>
            
            <div className={styles.info}>
                <div className={styles.username__info}>
                    <h4>Имя пользователя: <br/>{username}</h4>
                    <h4>ФИО: <br/>{fullname}</h4>
                </div>
            </div>
            <Button className={styles.modal__btn} onClick={onClick}>Выйти</Button>
            
        </div>
    )
};

export default ProfileWindow;