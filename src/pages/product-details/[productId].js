"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./product-details.module.css";
import Header from "@/widgets/header";
import { useGoods } from "@/shared/helpers/request";
import MainSlider from "@/widgets/main-slider";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { productId } = router.query;
  const { goods, loading } = useGoods();

  const [user, setUser] = useState(null);
  const [count, setCount] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [liked, setLiked] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("uzum-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const product = goods.find((item) => String(item.id) === String(productId));

  // Load user data from DB and check product state
  useEffect(() => {
    if (!user || !product) return;

    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const users = await res.json();
        const current = users.find((u) => u.id === user.id);
        if (!current) return;

        const liked = current.likes?.some((p) => p.id === product.id);
        const cartItem = current.cart?.find((c) => c.product.id === product.id);

        setLiked(liked);
        setInCart(!!cartItem);
        if (cartItem) setCount(cartItem.count);
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUser();
  }, [user, product]);

  const handleLike = async () => {
    if (!user) return alert("Пожалуйста, войдите в аккаунт.");

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();
    const current = users.find((u) => u.id === user.id);

    const alreadyLiked = current.likes?.some((p) => p.id === product.id);
    const updatedLikes = alreadyLiked
      ? current.likes.filter((p) => p.id !== product.id)
      : [...(current.likes || []), product];

    const updatedUser = { ...current, likes: updatedLikes };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    setLiked(!alreadyLiked);
  };

  const handleCart = async () => {
    if (!user) return alert("Пожалуйста, войдите в аккаунт.");

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();
    const current = users.find((u) => u.id === user.id);

    let updatedCart;
    const existing = current.cart.find((c) => c.product.id === product.id);

    if (existing) {
      updatedCart = current.cart.map((c) =>
        c.product.id === product.id ? { ...c, count: c.count + 1 } : c
      );
    } else {
      updatedCart = [...current.cart, { product, count: 1 }];
    }

    const updatedUser = { ...current, cart: updatedCart };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    setInCart(true);
    setCount(1);
  };

  const handleRemoveFromCart = async () => {
    if (!user || !product) return;

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();
    const current = users.find((u) => u.id === user.id);

    const updatedCart = current.cart.filter((c) => c.product.id !== product.id);

    const updatedUser = { ...current, cart: updatedCart };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  const handleCountChange = async (delta) => {
    const newCount = count + delta;
    if (newCount < 1) {
      await handleRemoveFromCart();
      setInCart(false);
      setCount(1);
      return;
    }

    setCount(newCount);

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();
    const current = users.find((u) => u.id === user.id);

    const updatedCart = current.cart.map((c) =>
      c.product.id === product.id ? { ...c, count: newCount } : c
    );

    const updatedUser = { ...current, cart: updatedCart };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  if (loading || !product) return <p>Loading...</p>;

  return (
    <div className="container">
      <Header />

      <section className={styles.product_box}>
        <div className={styles.product_details}>
          <div className={styles.product_details_img}>
            <img src={product.media[0]} alt={product.title} />
          </div>

          <div className={styles.product_details_info}>
            <h1 className={styles.product_title}>{product.title}</h1>

            <p className={styles.product_price}>
              <span>{product.price.toLocaleString("ru-RU")} сум</span>
              <span>
                {(product.price + 100001).toLocaleString("ru-RU")} сум
              </span>
            </p>

            {/* Counter under price */}
            {inCart && (
              <div className={styles.product_counter}>
                <span onClick={() => handleCountChange(-1)}>-</span>
                {count}
                <span onClick={() => handleCountChange(1)}>+</span>
              </div>
            )}

            <hr className={styles.hr} />

            <p className={styles.product_info}>{product.description}</p>

            <div className={styles.product_buttons}>
              <button
                onClick={handleCart}
                className={inCart ? styles.inCart : ""}
              >
                {inCart ? "В корзине" : "Добавить в корзину"}
              </button>
              <button
                onClick={handleLike}
                className={liked ? styles.liked : ""}
              >
                {liked ? "В избранном" : "Добавить в избранное"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.product_describtion}>
          <div>
            <h2>Описание товара</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>
            Кухонные товары
          </h1>
          <MainSlider goods={goods} filterType={product.type} slideNumber={5} />
        </div>
      </section>
    </div>
  );
}
