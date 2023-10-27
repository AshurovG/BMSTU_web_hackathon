// import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
// import {UserInfo} from './types'
import rootStore from 'store/RootStore/instance';
import axios from 'axios';

export interface IAuthFormStore {
    postUserData(): Promise<void>; // На регистрацию
    checkUserData(): Promise<void>; // На авторизацию
}

export type PrivateFields = '_usernameValue' | '_fullnameValue' | '_passwordValue' | '_isLoginForm' | '_isModalWindow' | '_isExistError' | '_isIncorrectError' | '_usernameValid' | '_fullnameValid' | '_passwordValid' | '_isValid';

export default class AuthFormStore implements IAuthFormStore, ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';
    private _passwordValue = '';
    private _isLoginForm = false;
    private _isModalWindow = false;
    private _isExistError = false;
    private _isIncorrectError = false;
    private _usernameValid = '';
    private _fullnameValid = '';
    private _passwordValid = '';
    private _isValid = false;

    public setUsernameValue = (value: string): void => {
        this._usernameValue = value;
    };

    public setFullnameValue = (value: string): void => {
        this._fullnameValue = value;
    };

    public setPasswordValue = (value: string): void => {
        this._passwordValue = value;
    };

    public setIsLoginForm = (): void => {
        this._usernameValue = '';
        this._fullnameValue = '';
        this._passwordValue = '';
        this._usernameValid = '';
        this._fullnameValid = '';
        this._passwordValid = '';
        this._isValid = false;
        this._isLoginForm = !this._isLoginForm;
    };

    public setIsModalWindow = (value: boolean): void => {
        this._isModalWindow = value;
    };

    public handleLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        this._isModalWindow = true;
        this.checkUserData()
    };

    public handleRegisterButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        console.log('handle register')
        this._isModalWindow = true;
        this.postUserData()
      };

    public usernameValidation = (): void => {
        if ((this._usernameValue.length < 6 || this._usernameValue.length > 15) && this._usernameValue.length !== 0) {
          this._usernameValid = 'Имя пользователя должно быть от 6 до 15 символов';
        } else if (this._usernameValue.length === 0) {
          this._usernameValid = 'Это обязательное поле';
        } else if (!/^[a-zA-Z0-9]+$/.test(this._usernameValue)) {
          this._usernameValid = 'Имя пользователя должно состоять только из латинских символов и цифр';
        } else {
          this._usernameValid = 'not error';
        }

        this.validation()
    }
    
    public fullnameValidation = (): void => {
        if (!this._isLoginForm) {
            const words = this._fullnameValue.split(" ");
            const russianLettersRegex = /^[а-яА-ЯёЁ\s]+$/;
          
            if (((words.length < 2 || words.length > 5) && this._fullnameValue.length !== 0) || (words.length > 1 && words[1].length === 0)) {
              this._fullnameValid = 'ФИО должно быть от 2 до 5 слов';
            } else if (!russianLettersRegex.test(this._fullnameValue)) {
              this._fullnameValid = 'ФИО должно быть на русском языке';
            } else if (this._fullnameValue.length === 0) {
              this._fullnameValid = 'Это обязательное поле';
            } else {
              this._fullnameValid = 'not error';
            }
          
            this.validation();
          }
        
    }

    public passwordValidation = (): void => {
        if ((this._passwordValue.length < 8 || this._passwordValue.length > 20) && this._passwordValue.length !== 0) {
          this._passwordValid = 'Пароль должен быть от 8 до 20 символов';
        } else if (this._passwordValue.length === 0) {
          this._passwordValid = 'Это обязательное поле';
        } else if (!/\d/.test(this._passwordValue) || !/[a-zA-Z]/.test(this._passwordValue)) {
          this._passwordValid = 'Пароль должен содержать латинские символы и цифры';
        } else {
          this._passwordValid = 'not error';
        }
        
        this.validation()
        
    }

    validation = (): void => {
        if (this._isLoginForm) {
            if (this._usernameValid === 'not error' && this._passwordValid === 'not error') {
                this._isValid = true;
            } else {
                this._isValid = false;
            }
        } else {
            if (this._usernameValid === 'not error' && this._fullnameValid === 'not error' && this._passwordValid === 'not error') {
                this._isValid = true;
            } else {
                this._isValid = false;
            }
        }
    }

    constructor() {
        makeObservable<AuthFormStore, PrivateFields>(this, {
            _usernameValue: observable,
            _fullnameValue: observable,
            _passwordValue: observable,
            _isLoginForm: observable,
            _isModalWindow: observable,
            _isExistError: observable,
            _isIncorrectError: observable,
            _usernameValid: observable,
            _fullnameValid: observable,
            _passwordValid: observable,
            _isValid: observable,
            usernameValue: computed,
            fullnameValue: computed,
            passwordValue: computed,
            isLoginForm: computed,
            isModalWindow: computed,
            isExistError: computed,
            isIncorrectError: computed,
            usernameValid: computed,
            fullnameValid: computed,
            passwordValid: computed,
            isValid: computed,
            setUsernameValue: action,
            setFullnameValue: action,
            setPasswordValue: action,
            setIsLoginForm: action,
        })
    };

    get usernameValue(): string {
        return this._usernameValue;
    };

    get fullnameValue(): string {
        return this._fullnameValue;
    };
    
    get passwordValue(): string {
        return this._passwordValue;
    };

    get isLoginForm(): boolean {
        return this._isLoginForm;
    }

    get isModalWindow(): boolean {
        return this._isModalWindow;
    }

    get isExistError(): boolean {
        return this._isExistError;
    }
    get isIncorrectError(): boolean {
        return this._isIncorrectError;
    }

    get usernameValid(): string {
        return this._usernameValid;
    }

    get fullnameValid(): string {
        return this._fullnameValid;
    }

    get passwordValid(): string {
        return this._passwordValid;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    async postUserData(): Promise<void> {
        const url = `https://653bf551d5d6790f5ec7af38.mockapi.io/hack/user`;
        const requestBody = {
            username: this._usernameValue,
            fullname:  this._fullnameValue,
            password: this.passwordValue,
        };

        const response = await axios.post(url, requestBody);
        console.log(response.status)

        runInAction(() => {

            if (response.status === 200 || response.status === 201) {
                rootStore.userAuth.setUserInfo(requestBody)
                rootStore.userAuth.setIsLogin(true)
                return
            }
        })
    }

    async checkUserData(): Promise<void> {
        console.log('check')
        const url = `https://653bf551d5d6790f5ec7af38.mockapi.io/hack/check`;
        const requestBody = {
            username: this._usernameValue,
            password: this.passwordValue,
        };

        const response = await axios.post(url, requestBody);

        runInAction(() => {

            if (response.status === 200 || response.status === 201 || response.status == 204) { // Сделать получение данных пользователя с бэка
                rootStore.userAuth.setUserInfo(requestBody)
                rootStore.userAuth.setIsLogin(true)
                return
            }
        })
    }


    reset(): void {
        this._isModalWindow = false;
        this._passwordValue = '';
        this._usernameValue = '';
        this._fullnameValue = '';
        this._passwordValue = '';
        this._isExistError = false;
        this._isIncorrectError = false;
    }

    destroy(): void {}
}