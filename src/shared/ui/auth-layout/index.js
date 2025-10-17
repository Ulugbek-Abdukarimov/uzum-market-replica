import AuthButton from "../auth-button"
import styles from "./auth-layout.module.css"

export default function AuthLayout ({ children, buttonText }) {
    return(
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>UZUM</div>
                <h2 className={styles.title}>Kirish</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        {children}
                    </div>
                    
                    <div className={styles.button}>
                        <AuthButton>
                            {buttonText}
                        </AuthButton>
                    </div>
                </form  >
                <div className={styles.footer}>
                    <p>
                        Akkount yo‘qmi?{" "}
                        <a href="/register">Ro‘yxatdan o‘tish</a>
                    </p>
                </div>
            </div>
        </div>
    )
}