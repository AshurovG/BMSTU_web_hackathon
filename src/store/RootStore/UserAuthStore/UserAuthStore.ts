import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_isLogin';

export default class AuthStore {
    private _isLogin = false;

    public setIsLogin = (value: boolean) => {
        this._isLogin = value;
        console.log(value)
    }

    constructor() {
        makeObservable<AuthStore, PrivateFields>(this, {
            _isLogin: observable,
            isLogin: computed,
            setIsLogin: action
        });
    }

    get isLogin(): boolean {
        console.log('get islogin')
        return this._isLogin;
    }
}