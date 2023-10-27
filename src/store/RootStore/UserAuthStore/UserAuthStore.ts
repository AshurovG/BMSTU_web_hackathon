import { action, computed, makeObservable, observable } from 'mobx';
import { UserInfo } from './types';
// import Cookies from 'js-cookie';
type PrivateFields = '_isLogin' | '_userInfo';

export default class AuthStore {
    private _isLogin = false;
    private _userInfo: UserInfo = {
        username: '',
        fullname: '',
        password: ''
    };

    public setIsLogin = (value: boolean) => {
        this._isLogin = value;
    }

    public setUserInfo = (user: UserInfo) => {
        console.log(user)
        this._userInfo = user;
    }

    constructor() {
        // Здесь проверить был ли пользователь авторизирован
        // через отправку с запросом с куки
        // если был, то записать все его данные в userInfo
        makeObservable<AuthStore, PrivateFields>(this, {
            _isLogin: observable,
            _userInfo: observable,
            isLogin: computed,
            userInfo: computed,
            setIsLogin: action,
            setUserInfo: action
        });
    }

    get isLogin(): boolean {
        return this._isLogin;
    }

    get userInfo(): UserInfo {
        return this._userInfo
    }
}