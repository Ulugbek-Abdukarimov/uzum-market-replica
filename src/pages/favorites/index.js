"use client";
import { useEffect, useState } from "react";
import styles from "./favorites.module.css";
import Header from "@/widgets/header";
import ProductCard from "@/shared/ui/product-card";

export default function FavoritesPage() {
  const [likedGoods, setLikedGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("uzum-user");

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchLikedGoods = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        if (!res.ok) throw new Error("Ошибка при получении данных пользователей");

        const users = await res.json();
        const userData = users.find((u) => u.id === parsedUser.id);

        if (userData && Array.isArray(userData.likes)) {
          setLikedGoods(userData.likes);
        } else {
          setLikedGoods([]);
        }
      } catch (err) {
        console.error("Ошибка загрузки избранных товаров:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedGoods();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Header />
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <Header />
        <h1 className={styles.title}>Избранное</h1>
        <p className={styles.message}>
          Пожалуйста, войдите в аккаунт, чтобы увидеть избранные товары.
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <h1 className={styles.title}>Избранное</h1>

      <div className={styles.productsList}>
        {likedGoods.length > 0 ? (
          likedGoods.map((good) => (
            <ProductCard key={good.id} good={good} />
          ))
        ) : (
          <p className={styles.message}>У вас пока нет избранных товаров.</p>
        )}
      </div>
    </div>
  );
}