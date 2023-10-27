import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "components/Button";
import styles from "./AuthForm.module.scss";
import Input from "components/Input";
import Text from "components/Text";
import Header from "components/Header";
import ModalWindow from "components/ModalWindow";
import SuccessIcon from "components/icons/SuccessIcon";
import { useLocalStore } from "utils/useLocalStore";
import AuthFormStore from "store/AuthFormStore";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore";
import cn from "classnames";

const AuthForm: React.FC = () => {
  const authFormStore = useLocalStore(() => new AuthFormStore());
  const navigate = useNavigate();
  const handleBackdropClick = () => {
    authFormStore.setIsModalWindow(false);
    navigate("/");
  };

  return (
    <div
      className={cn(styles.form__wrapper, {
        [styles.dark]: rootStore.theme.isDark,
      })}
    >
      <Header />
      <form
        className={cn(styles.login__form, {
          [styles.dark]: rootStore.theme.isDark,
        })}
        action=""
      >
        {!rootStore.userAuth.isLogin}
        {!authFormStore.isLoginForm ? (
          <h2 className={styles.form__title}>Регистрация</h2>
        ) : (
          <h2 className={styles.form__title}>Авторизация</h2>
        )}
        <div className={styles["login__form-wrapper"]}>
          <div className={styles.input__block}>
            <Input
              type="text"
              value={authFormStore.usernameValue}
              onChange={(value: string) => {
                authFormStore.setUsernameValue(value);
                authFormStore.usernameValidation();
              }}
              placeholder="Введите имя пользователя*"
            />
            {authFormStore.usernameValid !== "not error" && (
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
                onChange={(value: string) => {
                  authFormStore.setFullnameValue(value);
                  authFormStore.fullnameValidation();
                }}
                placeholder="Введите ФИО*"
              />
              {authFormStore.fullnameValid !== "not error" && (
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
              onChange={(value: string) => {
                authFormStore.setPasswordValue(value);
                authFormStore.passwordValidation();
              }}
              placeholder="Введите пароль*"
            />
            {authFormStore.passwordValid !== "not error" && (
              <Text tag="p" view="p-16" color="error">
                {authFormStore.passwordValid}
              </Text>
            )}
          </div>
          {authFormStore.isValid ? (
            !authFormStore.isLoginForm ? (
              <Button
                onClick={(e) => authFormStore.handleRegisterButtonClick(e)}
                className={styles["login__form-btn"]}
              >
                Зарегистрироваться
              </Button>
            ) : (
              <Button
                onClick={(e) => authFormStore.handleLoginButtonClick(e)}
                className={styles["login__form-btn"]}
              >
                Войти
              </Button>
            )
          ) : !authFormStore.isLoginForm ? (
            <Button
              disabled
              onClick={(e) => authFormStore.handleRegisterButtonClick(e)}
              className={styles["login__form-btn"]}
            >
              Зарегистрироваться
            </Button>
          ) : (
            <Button
              disabled
              onClick={(e) => authFormStore.handleLoginButtonClick(e)}
              className={styles["login__form-btn"]}
            >
              Войти
            </Button>
          )}

          {!authFormStore.isLoginForm ? (
            <div
              onClick={authFormStore.setIsLoginForm}
              className={styles["login__form-link"]}
            >
              У вас уже есть аккаунт?
            </div>
          ) : (
            <div
              onClick={authFormStore.setIsLoginForm}
              className={styles["login__form-link"]}
            >
              У вас еще нет аккаунта?
            </div>
          )}
        </div>
      </form>

      {!authFormStore.isLoginForm && (
        <ModalWindow
          handleBackdropClick={handleBackdropClick}
          className={styles.modal}
          active={authFormStore.isModalWindow}
        >
          <h3 className={styles.modal__title}>Регистрация прошла успешно!</h3>
          <SuccessIcon color={rootStore.theme.isDark ? "#7961f1" : "#518581"} />
        </ModalWindow>
      )}

      {authFormStore.isLoginForm && (
        <ModalWindow
          handleBackdropClick={handleBackdropClick}
          className={styles.modal}
          active={authFormStore.isModalWindow}
        >
          <h3 className={styles.modal__title}>Авторизация прошла успешно!</h3>
          <SuccessIcon color={rootStore.theme.isDark ? "#7961f1" : "#518581"} />
        </ModalWindow>
      )}
    </div>
  );
};

export default observer(AuthForm);
