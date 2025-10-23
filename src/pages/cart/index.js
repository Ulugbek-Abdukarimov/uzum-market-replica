"use client";
import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Header from "@/widgets/header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("uzum-user");
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const users = await res.json();
        const current = users.find((u) => u.id === parsedUser.id);
        setCartItems(current?.cart || []);
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateCount = async (productId, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, count: Math.max(1, (item.count || 1) + delta) }
        : item
    );
    setCartItems(updatedCart);

    const updatedUser = { ...user, cart: updatedCart };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  const deleteItem = async (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedCart);

    const updatedUser = { ...user, cart: updatedCart };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  const totalSum = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * (item.count || 1),
    0
  );
  const totalCount = cartItems.reduce((acc, item) => acc + (item.count || 1), 0);
  const totalDiscount = Math.round(totalSum * 0.13); // example 13% discount

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="container">
      <Header />
      <h1 className={styles.title}>Корзина товаров</h1>

      <div className={styles.cartWrapper}>
        {/* LEFT – product list */}
        <div className={styles.productsList}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <img src={item.product.media[0]} alt={item.product.title} />
                <div className={styles.cartInfo}>
                  <p className={styles.itemTitle}>{item.product.title}</p>
                  <p className={styles.itemPrice}>
                    {item.product.price.toLocaleString("ru-RU")} сум
                  </p>
                  <div className={styles.controlsRow}>
                    <div className={styles.countControls}>
                      <button onClick={() => updateCount(item.product.id, -1)}>
                        -
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => updateCount(item.product.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => deleteItem(item.product.id)}
                      className={styles.deleteBtn}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Ваша корзина пуста.</p>
          )}
        </div>

        {/* RIGHT – summary */}
        <div className={styles.summaryBox}>
          <h2 className={styles.totalPrice}>
            {totalSum.toLocaleString("ru-RU")} сум
          </h2>
          <p>Итого товаров: {totalCount}</p>
          <p>Итого скидки: {totalDiscount.toLocaleString("ru-RU")} сум</p>
          <button className={styles.checkoutBtn}>Оформить</button>
        </div>
      </div>
    </div>
  );
}
  