import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_isDark";

export default class ThemeStore {
  private _isDark = localStorage.getItem("isDark") === "true";

  public setIsDark = (value: boolean) => {
    console.log("set");
    this._isDark = value;
  };

  constructor() {
    console.log("constructor");
    makeObservable<ThemeStore, PrivateFields>(this, {
      _isDark: observable,
      isDark: computed,
      setIsDark: action,
    });
  }

  get isDark(): boolean {
    return this._isDark;
  }
}
