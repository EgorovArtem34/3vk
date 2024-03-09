import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import { classNames } from "@/utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "clear",
    className = "",
    type = "button",
    ...rest
  } = props;

  return (
    <button
      className={classNames(styles.button, { [styles[variant]]: variant }, [
        className,
      ])}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
