import Link from "next/link"
import AuthButton from "../auth-button"
import styles from "./auth-register-layout.module.css"

export default function AuthLayout ({ children }) {
    return(
        <div className={styles.wrapper}>
            <div className={styles.registerBox}>
                <div className={styles.logo}>UZUM</div>
                <h2 className={styles.title}>Ro‘yxatdan o‘tish</h2>
                {children}
        
                <div className={styles.footer}>
                    <p>
                        Akkount bormi?{" "}
                        <Link href="/login">Kirish</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}