import styles from "./register.module.css";
import AuthLayout from "@/shared/ui/auth-register-layout"
import AuthInput from "@/shared/ui/auth-input";
import AuthButton from "@/shared/ui/auth-button";

export default function Page(){
    return(
        <AuthLayout >
            <form className={styles.form}>
                    <div className={styles.inputGroup}>
                            <AuthInput type="text"  id="fullName" placeholder="To‘liq ism" required />
                            <AuthInput type="email"  id="email" placeholder="Email" required />
                            <AuthInput type="password"  id="password" placeholder="Parol" required />
                            <AuthInput type="password"  id="passwordVerification" placeholder="Parolni tasdiqlang" required />
        
                    </div>
                    
                    <div className={styles.button}>
                        <AuthButton>
                            Ro‘yxatdan o‘tish
                        </AuthButton>
                    </div>
                </form>
          </AuthLayout>
    )
}