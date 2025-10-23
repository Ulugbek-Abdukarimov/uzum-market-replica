"use client";
import { useState } from "react";
import styles from "./auth-input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthInput({ id, type, placeholder, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.inputGroup}>
      <input
        autoComplete="off"
        name={id}
        id={id}
        placeholder={placeholder}
        type={isPassword && showPassword ? "text" : type}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          className={styles.eyeButton}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}
