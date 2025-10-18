"use client";
import styles from "./header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("uzum-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <img src="/icons/uzum-logo.png" alt="Логотип" className={styles.logo} />
          </Link>
          <span className={styles.brand_name}>uzum market</span>
        </div>

        <div className={styles.catalog}>
          <Link href="/home">Каталог</Link> 
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Поиск товаров"
            className={styles.search_input}
          />
          <span className={styles.search_icon}>
            <img src="/icons/search-icon.svg" alt="Логотип" className={styles.search_logo} />
          </span>
        </div>

        <div className={styles.profile}>
          <Link href="#">
            <i class="fa-regular fa-user"> </i>
            {user ? user.name : "Профиль"}
          </Link>
          <Link href="/favorites">Избранное</Link> 
          <Link href="/cart">Корзина</Link> 
        </div>

      </div>
    </header>
  );
}
