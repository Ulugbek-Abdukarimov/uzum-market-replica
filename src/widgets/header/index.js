  "use client";
  import { useEffect, useState } from "react";
  import Link from "next/link";
  import { useGoods } from "@/shared/helpers/request";
  import styles from "./header.module.css";

  export default function Header() {
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { goods, loading } = useGoods();

    useEffect(() => {
      const storedUser = localStorage.getItem("uzum-user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const categories = goods.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    const filteredSuggestions =
      query.length > 0
        ? goods.filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    return (
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img src="/icons/uzum-logo.png" alt="Логотип" />
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchActive(true)}
            />
            <span className={styles.search_icon}>
              <img src="/icons/search-icon.svg" alt="search" />
            </span>
          </div>

          <div className={styles.profile}>
            <Link href="#">
              <i className="fa-regular fa-user" /> {user ? user.name : "Профиль"}
            </Link>
            <Link href="/favorites">Избранное</Link>
            <Link href="/cart">Корзина</Link>
          </div>
        </div>

        {isSearchActive && (
          <>
            <div className={styles.search_overlay} onClick={() => setIsSearchActive(false)} />
            <div className={styles.search_dropdown}>
              {query === "" ? (
                <>
                  <h2 className={styles.dropdown_title}>Категории товаров</h2>
                  <div className={styles.categories}>
                    {Object.entries(categories).map(([type, count]) => (
                      <div key={type} className={styles.category_item}>
                        <span className={styles.category_name}>{type}</span>
                        <span className={styles.category_count}>{count} товара</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : filteredSuggestions.length > 0 ? (
                <ul className={styles.suggestions}>
                  {filteredSuggestions.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <Link href={`/product-details/${item.id}`} onClick={() => setIsSearchActive(false)}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.no_results}>Ничего не найдено 😕</p>
              )}
            </div>
          </>
        )}
      </header>
    );
  }
