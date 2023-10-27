import * as React from "react";
import cn from "classnames";
import styles from "./Input.module.scss";
import rootStore from "../../store/RootStore";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  disabled?: Boolean;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled, className, ...props }, ref) => {
    const changeHandler = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <label
        className={cn(
          styles["input-wrapper"],
          {
            [styles.dark]: rootStore.theme.isDark,
          },
          disabled && styles["input-wrapper_disabled"],
          className
        )}
      >
        <input
          autoComplete="off"
          value={value}
          onChange={changeHandler}
          className={cn(styles.input, {
            [styles.dark]: rootStore.theme.isDark,
          })}
          ref={ref}
          disabled={disabled}
          type="text"
          {...props}
        />
        {!!afterSlot && (
          <div className={styles["input-after"]}>{afterSlot}</div>
        )}
      </label>
    );
  }
);

export default Input;
