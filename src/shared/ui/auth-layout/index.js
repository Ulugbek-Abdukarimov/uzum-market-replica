import Link from "next/link"
import AuthButton from "../auth-button"
import styles from "./auth-layout.module.css"

export default function AuthLayout ({ children  }) {
    return(
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>UZUM</div>
                <h2 className={styles.title}>Kirish</h2>
                {children}
                <div className={styles.footer}>
                    <p>
                        Akkount yo‘qmi?{" "}
                        <Link href="/register">Ro‘yxatdan o‘tish</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}