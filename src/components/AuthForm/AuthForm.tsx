import * as React from "react";
import cn from "classnames";
import Text from "components/Text/Text";
// import Header from 'components/Header';
import styles from "./AuthForm.module.scss";
import Input from "components/Input";
import { useLocalStore } from "utils/useLocalStore";
import AuthFormStore from "store/AuthFormStore";
import { observer } from "mobx-react-lite";
import ModalWindow from "components/ModalWindow";
import LockingScreen from "components/LockingScreen";
import SuccessIcon from "components/icons/SuccessIcon";
import Button from "components/Button";

import rootStore from "../../store/RootStore";

const AuthForm: React.FC = () => {
  const authFormStore = useLocalStore(() => new AuthFormStore());

  return (
    <div className={styles.form__wrapper}>
      <form className={styles.login__form} method="post">
        {!authFormStore.isLoginForm ? (
          <h2 className={styles.form__title}>Registration</h2>
        ) : (
          <h2 className={styles.form__title}>Login</h2>
        )}
        <div className={styles["login__form-wrapper"]}>
          <div className={styles.input__block}>
            <Input
              type="text"
              value={authFormStore.usernameValue}
              onChange={authFormStore.setUsernameValue}
              placeholder="Enter username*"
            />
            {authFormStore.usernameValid !== "" && (
              <Text tag="p" view="p-16" color="error">
                {authFormStore.usernameValid}
              </Text>
            )}
          </div>
          {!authFormStore.isLoginForm && (
            <div className={styles.input__block}>
              <Input
                type="text"
                value={authFormStore.fullnameValue}
                onChange={authFormStore.setFullnameValue}
                placeholder="Enter fullname*"
              />
              {authFormStore.fullnameValid !== "" && (
                <Text tag="p" view="p-16" color="error">
                  {authFormStore.fullnameValid}
                </Text>
              )}
            </div>
          )}
          <div className={styles.input__block}>
            <Input
              type="password"
              value={authFormStore.passwordValue}
              onChange={authFormStore.setPasswordValue}
              placeholder="Enter password*"
            />
            {authFormStore.passwordValid !== "" && (
              <Text tag="p" view="p-16" color="error">
                {authFormStore.passwordValid}
              </Text>
            )}
          </div>
          {!authFormStore.isLoginForm ? (
            <Button
              type="submit"
              onClick={() => {}}
              className={styles["login__form-btn"]}
            >
              Register
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {}}
              className={styles["login__form-btn"]}
            >
              Login
            </Button>
          )}

          {!authFormStore.isLoginForm ? (
            <div
              onClick={authFormStore.setIsLoginForm}
              className={styles["login__form-link"]}
            >
              Do you already have an account?
            </div>
          ) : (
            <div
              onClick={authFormStore.setIsLoginForm}
              className={styles["login__form-link"]}
            >
              Don 't you have an account yet?
            </div>
          )}
        </div>
        {authFormStore.isExistError &&
          !authFormStore.isLoginForm &&
          !authFormStore.isModalWindow && (
            <Text tag="p" view="p-16" color="error">
              A user with this username already exists!
            </Text>
          )}
        {authFormStore.isIncorrectError &&
          authFormStore.isLoginForm &&
          !authFormStore.isModalWindow && (
            <Text tag="p" view="p-16" color="error">
              Invalid username or password!
            </Text>
          )}
      </form>
      {/* {authFormStore.isModalWindow 
            && !authFormStore.isLoginForm &&<ModalWindow to='/' onClick={authFormStore.handleCloseButtonClick} title='You have successfully registered!' className={styles.form__modal}><div className={styles.slot}><SuccessIcon ></SuccessIcon></div></ModalWindow>}
            {authFormStore.isModalWindow && <LockingScreen onClick={authFormStore.handleCloseButtonClick} to='/'></LockingScreen>}

            {authFormStore.isModalWindow 
            && authFormStore.isLoginForm &&<ModalWindow to='/' onClick={authFormStore.handleCloseButtonClick} title='You have successfully logged in!' className={styles.form__modal}><div className={styles.slot}><SuccessIcon></SuccessIcon></div></ModalWindow>}
            {authFormStore.isModalWindow && authFormStore.isLoginForm && <LockingScreen onClick={authFormStore.handleCloseButtonClick} to='/'></LockingScreen>} */}
    </div>
  );
};

export default observer(AuthForm);
