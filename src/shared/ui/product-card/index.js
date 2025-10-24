"use client";
import { useUserData } from "@/shared/ui/context/UserDataContext";
import styles from "./product-card.module.css";
import Link from "next/link";

export default function ProductCard({ good }) {
  const { user, likes, setLikes, cart, setCart } = useUserData();

  const liked = likes.some((item) => item.id === good.id);
  const inCart = cart.some((item) => item.product?.id === good.id);

  const toggleLike = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы добавить в избранное.");
      return;
    }

    const dbUrl = "http://localhost:3001/users";

    try {
      const res = await fetch(`${dbUrl}/${user.id}`);
      let userData = res.ok ? await res.json() : null;

      if (!userData) {
        userData = { id: user.id, name: user.name, likes: [], cart: [] };
        await fetch(dbUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      const updatedLikes = liked
        ? likes.filter((item) => item.id !== good.id)
        : [...likes, good];

      setLikes(updatedLikes);

      await fetch(`${dbUrl}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedLikes }),
      });
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const handleCart = async () => {
    if (!user) return alert("Пожалуйста, войдите в аккаунт.");

    const dbUrl = "http://localhost:3001/users";

    try {
      const res = await fetch(`${dbUrl}/${user.id}`);
      const current = await res.json();

      const existing = current.cart?.find((c) => c.product.id === good.id);
      let updatedCart;

      if (existing) {
        updatedCart = current.cart.filter((c) => c.product.id !== good.id);
      } else {
        updatedCart = [...(current.cart || []), { product: good, count: 1 }];
      }

      setCart(updatedCart);

      await fetch(`${dbUrl}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  return (
    <div className={styles.productSlider__card}>
      <Link href={`/product-details/${good.id}`} className={styles.linkWrapper}>
        <div className={styles.linkContent}>
          <div className={styles.productSlider__image}>
            <img src={good.media[0]} alt={good.title} />
          </div>

          <p className={styles.productSlider__title}>{good.title}</p>

          <div className={styles.productSlider__price}>
            {good.isBlackFriday ? (
              <>
                <p className={styles.oldPrice}>
                  {(good.price + 100001).toLocaleString("ru-RU")} сум
                </p>
                <p className={styles.currentPrice}>
                  {good.price.toLocaleString("ru-RU")} сум
                </p>
              </>
            ) : (
              <p className={styles.currentPrice}>
                {good.price.toLocaleString("ru-RU")} сум
              </p>
            )}
          </div>
        </div>
      </Link>

      <span
        className={`${styles.shopping_cart} ${inCart ? styles.inCart : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleCart();
        }}
      >
        <img src="/icons/shopping-cart.png" alt="#Shopping_Cart" />
      </span>

      <span
        className={`${styles.liked} ${liked ? styles.active : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike();
        }}
      >
        <i className="fa-solid fa-heart"></i>
      </span>
    </div>
  );
}