import * as React from 'react';
// import cn from 'classnames';
// import Text from 'components/Text/Text';
// import Header from 'components/Header';
import Button from 'components/Button';
import styles from './AuthForm.module.scss';
import Input from 'components/Input';
import Text from 'components/Text';
import Header from 'components/Header';
import ModalWindow from 'components/ModalWindow';
import SuccessIcon from 'components/icons/SuccessIcon';
import LockingScreen from 'components/LockingScreen';
import { useLocalStore } from 'utils/useLocalStore';
import AuthFormStore from 'store/AuthFormStore';
import { observer } from 'mobx-react-lite';

const AuthForm: React.FC = () => {
    const authFormStore = useLocalStore(() => new AuthFormStore());

    return (
        <div className={styles.form__wrapper}>
            <Header />
            <form className={styles.login__form} action="">
                {!authFormStore.isLoginForm 
                ? <h2 className={styles.form__title}>Регистрация</h2>
                : <h2 className={styles.form__title}>Авторизация</h2>
                }
                <div className={styles['login__form-wrapper']}>
                    <div className={styles.input__block}>
                        <Input type='text' value={authFormStore.usernameValue} onChange={authFormStore.setUsernameValue} placeholder='Введите имя пользователя*'/>
                        {authFormStore.usernameValid !== '' && <Text tag='p' view='p-16' color='error'>{authFormStore.usernameValid}</Text>}
                    </div>
                    {!authFormStore.isLoginForm &&
                    <div className={styles.input__block}>
                        <Input type='text' value={authFormStore.fullnameValue} onChange={authFormStore.setFullnameValue} placeholder='Введите ФИО*'/>
                        {authFormStore.fullnameValid !== '' && <Text tag='p' view='p-16' color='error'>{authFormStore.fullnameValid}</Text>}
                    </div>
                    }
                    <div className={styles.input__block}>
                        <Input type='password' value={authFormStore.passwordValue} onChange={authFormStore.setPasswordValue} placeholder='Введите пароль*'/>
                        {authFormStore.passwordValid !== '' && <Text tag='p' view='p-16' color='error'>{authFormStore.passwordValid}</Text>}
                    </div>
                    {!authFormStore.isLoginForm 
                    ? <Button onClick={(e) => authFormStore.handleRegisterButtonClick(e)} className={styles['login__form-btn']}>Зарегистрироваться</Button>
                    : <Button className={styles['login__form-btn']}>Войти</Button>
                    }
                    
                    {!authFormStore.isLoginForm 
                    ? <div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>У вас уже есть аккаунт?</div>
                    : <div onClick={authFormStore.setIsLoginForm} className={styles['login__form-link']}>У вас еще нет аккаунта?</div>
                    }
                </div>
            </form>

            {authFormStore.isModalWindow 
            && !authFormStore.isLoginForm &&<ModalWindow to='/' onClick={authFormStore.handleCloseButtonClick} title='You have successfully registered!' className={styles.form__modal}><div className={styles.slot}><SuccessIcon ></SuccessIcon></div></ModalWindow>}
            {authFormStore.isModalWindow && <LockingScreen onClick={authFormStore.handleCloseButtonClick} to='/'></LockingScreen>}

            {authFormStore.isModalWindow 
            && authFormStore.isLoginForm &&<ModalWindow to='/' onClick={authFormStore.handleCloseButtonClick} title='You have successfully logged in!' className={styles.form__modal}><div className={styles.slot}><SuccessIcon></SuccessIcon></div></ModalWindow>}
            {authFormStore.isModalWindow && authFormStore.isLoginForm && <LockingScreen onClick={authFormStore.handleCloseButtonClick} to='/'></LockingScreen>}
        </div >
    )
};

export default observer(AuthForm);