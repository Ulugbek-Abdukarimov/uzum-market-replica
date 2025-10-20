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
    const stored = localStorage.getItem("uzum-user");

    if (!stored) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);

    const fetchLikedGoods = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();

        const userData = users.find((u) => u.id === parsedUser.id);

        if (userData && userData.likes) {
          setLikedGoods(userData.likes);
        } else {
          setLikedGoods([]);
        }
      } catch (err) {
        console.error("Error fetching liked goods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedGoods();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  if (!user) {
    return (
      <div className="container">
        <Header />
        <h1 className={styles.title}>Избранное</h1>
        <p>Пожалуйста, войдите в аккаунт, чтобы увидеть избранные товары.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <h1 className={styles.title}>Избранное</h1>

      <div className={styles.productsList}>
        {likedGoods.length > 0 ? (
          likedGoods.map((good) => <ProductCard key={good.id} good={good} />)
        ) : (
          <p>У вас пока нет избранных товаров.</p>
        )}
      </div>
    </div>
  );
}
