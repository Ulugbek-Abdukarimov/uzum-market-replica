"use client";
import { useState } from "react";
import styles from "./auth-input.module.css";

export default function AuthInput({ id, type, placeholder, ...rest }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const isPassword = type === "password";

  return (
    <div className={styles.inputGroup}>
      <input
        autoComplete="off"
        name={id}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
