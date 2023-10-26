import React from "react";
import Sun from "../../assets/icons/sun.png";
import Moon from "../../assets/icons/moon.png";

import styles from "./ThemeSwitcher.module.scss";
import rootStore from "../../store/RootStore";

export type ThemeSwitcherProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  isChecked: boolean;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  onChange,
  isChecked,
}) => {
  const handler = (): void => {
    rootStore.theme.setIsDark(true);
  };

  return (
    <div className={styles["toggle-container"]}>
      <input
        type="checkbox"
        id="check"
        className={styles.toggle}
        onClick={handler}
        checked={isChecked}
      />
      <label htmlFor="check">Dark Mode</label>
    </div>
  );
};

export default ThemeSwitcher;
