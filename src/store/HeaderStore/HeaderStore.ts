import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import rootStore from 'store/RootStore';

export type PrivateFields = '_isBurgerMenuOpen' | '_isAuthFormOpen' | '_isProfileButtonClicked';

export default class HeaderStore implements ILocalStore {
    private _isBurgerMenuOpen = false;
    private _isAuthFormOpen = false;
    private _isProfileButtonClicked = false;

    public setIsBurgerMenuOpen = () => {
        this._isBurgerMenuOpen = !this._isBurgerMenuOpen;
    }

    public setIsAuthFormOpen = () => {
        this._isAuthFormOpen = true
        
    }

    public setIsProfileButtonClicked = () => {
        this._isProfileButtonClicked = !this._isProfileButtonClicked
    }


    constructor() {
        makeObservable<HeaderStore, PrivateFields>(this, {
            _isBurgerMenuOpen: observable,
            _isAuthFormOpen: observable,
            _isProfileButtonClicked: observable,
            isBurgerMenuOpen: computed,
            isAuthFormOpen: computed,
            isProfileButtonClicked: computed,
            setIsBurgerMenuOpen: action,
            setIsAuthFormOpen: action,
            setIsProfileButtonClicked: action
        })
    };

    get isBurgerMenuOpen(): boolean {
        return this._isBurgerMenuOpen;
    };
    
    get isAuthFormOpen(): boolean {
        return this._isAuthFormOpen;
    };

    get isProfileButtonClicked(): boolean {
        return this._isProfileButtonClicked
    }

    reset(): void {}

    destroy(): void {}
}