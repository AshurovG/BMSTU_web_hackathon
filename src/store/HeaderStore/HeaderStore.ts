import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import rootStore from 'store/RootStore';

export type PrivateFields = '_isBurgerMenuOpen' | '_isAuthFormOpen' | '_isProfileButtonClicked';

export default class HeaderStore implements ILocalStore {
    private _isBurgerMenuOpen = false;
    private _isAuthFormOpen = false;
    private _isProfileButtonClicked = false;

    constructor() {
        makeObservable<HeaderStore, PrivateFields>(this, {
            _isBurgerMenuOpen: observable,
            _isAuthFormOpen: observable,
            _isProfileButtonClicked: observable,
            isBurgerMenuOpen: computed,
            isProfileButtonClicked: computed,
        })
    };

    get isBurgerMenuOpen(): boolean {
        return this._isBurgerMenuOpen;
    };
    

    get isProfileButtonClicked(): boolean {
        return this._isProfileButtonClicked
    }

    reset(): void {}

    destroy(): void {}
}