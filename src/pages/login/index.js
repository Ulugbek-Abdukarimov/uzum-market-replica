"use client";
import styles from "./login.module.css";
import AuthLayout from "@/shared/ui/auth-layout";
import AuthInput from "@/shared/ui/auth-input";
import AuthButton from "@/shared/ui/auth-button";

export default function Page() {
  return (
    <AuthLayout>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
            <AuthInput
                type="email"
                id="email"
                placeholder="Email"
                required
            />

        
            <AuthInput
              type="password"
              id="password"
              placeholder="Parol"
              required
            />
         </div>
        

        <div className={styles.button}>
          <AuthButton> Kirish </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
