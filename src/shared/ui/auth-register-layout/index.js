import AuthButton from "../auth-button"
import styles from "./auth-register-layout.module.css"

export default function AuthLayout ({ children, buttonText }) {
    return(
        <div className={styles.wrapper}>
            <div className={styles.registerBox}>
                <div className={styles.logo}>UZUM</div>
                <h2 className={styles.title}>Ro‘yxatdan o‘tish</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        {children}
                    </div>
                    
                    <div className={styles.button}>
                        <AuthButton>
                            {buttonText}
                        </AuthButton>
                    </div>
                </form>
        
                <div className={styles.footer}>
                    <p>
                        Akkount bormi?{" "}
                        <a href="/login">Kirish</a>
                    </p>
                </div>
            </div>
        </div>
    )
}