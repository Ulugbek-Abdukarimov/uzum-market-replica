"use client";
import { useState, useEffect } from "react";
import styles from "./product-card.module.css";
import Link from "next/link";

export default function ProductCard({ good }) {
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("uzum-user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const toggleLike = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы добавить в избранное.");
      return;
    }

    const userId = user.id;
    const dbUrl = "http://localhost:3001/users";
    const authUrl = `http://localhost:3002/users/${userId}`;

    try {
      const authRes = await fetch(authUrl);
      if (!authRes.ok) throw new Error("User not found in auth db (port 3002)");
      const authUser = await authRes.json();

      const res = await fetch(dbUrl);
      const allUsers = res.ok ? await res.json() : [];
      let userData = allUsers.find((u) => u.id === userId);

      if (!userData) {
        userData = {
          id: userId,
          name: authUser.name || authUser.username || "Unnamed User",
          likes: [],
          cart: [],
        };
        await fetch(dbUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      const alreadyLiked = userData.likes.some((item) => item.id === good.id);
      const updatedLikes = alreadyLiked
        ? userData.likes.filter((item) => item.id !== good.id)
        : [...userData.likes, good];

      const updatedUser = { ...userData, likes: updatedLikes };

      await fetch(`${dbUrl}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setLiked(!alreadyLiked);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы добавить в корзину.");
      return;
    }

    const userId = user.id;
    const dbUrl = "http://localhost:3001/users";
    const authUrl = `http://localhost:3002/users/${userId}`;

    try {
      const authRes = await fetch(authUrl);
      if (!authRes.ok) throw new Error("User not found in auth db (port 3002)");
      const authUser = await authRes.json();

      const res = await fetch(dbUrl);
      const allUsers = res.ok ? await res.json() : [];
      let userData = allUsers.find((u) => u.id === userId);

      if (!userData) {
        userData = {
          id: userId,
          name: authUser.name || authUser.username || "Unnamed User",
          likes: [],
          cart: [],
        };
        await fetch(dbUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      const alreadyInCart = userData.cart.some((item) => item.id === good.id);
      const updatedCart = alreadyInCart
        ? userData.cart.filter((item) => item.id !== good.id)
        : [...userData.cart, good];

      const updatedUser = { ...userData, cart: updatedCart };

      await fetch(`${dbUrl}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setInCart(!alreadyInCart);
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const isBlackFriday = good.isBlackFriday === true;

  return (<div className={styles.productSlider__card}>
  {/* Only clickable part wrapped in Link */}
  <Link href={`/product-details/${good.id}`} className={styles.linkWrapper}>
    <div className={styles.linkContent}>
      <div className={styles.productSlider__image}>
        <img src={good.media[0]} alt={good.title} />
      </div>

      <p className={styles.productSlider__title}>{good.title}</p>

      <div className={styles.productSlider__price}>
        {isBlackFriday ? (
          <>
            <p className={styles.oldPrice}>
              {(good.price + 100001).toLocaleString("ru-RU")} сум
            </p>
            <p className={styles.currentPrice}>
              {good.price.toLocaleString("ru-RU")} сум
            </p>
          </>
        ) : (
          <>
            <p className={styles.oldPrice}>
              {(good.price + 100001).toLocaleString("ru-RU")} сум
            </p>
            <p className={styles.currentPrice}>
              {good.price.toLocaleString("ru-RU")} сум
            </p>
          </>
        )}
      </div>
    </div>
  </Link>

  {/* Buttons outside Link */}
  <span
    className={`${styles.shopping_cart} ${inCart ? styles.inCart : ""}`}
    onClick={(e) => {
      e.stopPropagation(); // prevent Link click
      handleAddToCart();
    }}
  >
    <img src="./icons/shopping-cart.png" alt="#Shopping_Cart" />
  </span>

  <span
    className={`${styles.liked} ${liked ? styles.active : ""}`}
    onClick={(e) => {
      e.stopPropagation(); // prevent Link click
      toggleLike();
    }}
  >
    <i className="fa-regular fa-heart"></i>
  </span>
</div>

  );
}
