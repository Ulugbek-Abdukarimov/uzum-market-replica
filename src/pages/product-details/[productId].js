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
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [count, setCount] = useState(1);
  const [refresh, setRefresh] = useState(false); 

  const product = goods.find((item) => String(item.id) === String(productId));

  useEffect(() => {
    const stored = localStorage.getItem("uzum-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);


  useEffect(() => {
    if (!user || !product) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${user.id}`);
        const data = await res.json();

        const liked = data.likes?.some((p) => p.id === product.id);
        const cartItem = data.cart?.find((c) => c.product.id === product.id);

        setLiked(!!liked);
        setInCart(!!cartItem);
        setCount(cartItem ? cartItem.count : 1);
      } catch (err) {
        console.error("Error loading product states:", err);
      }
    };

    fetchUser();
  }, [user, product, refresh]);

  const handleLike = async () => {
    if (!user) return alert("Пожалуйста, войдите в аккаунт.");

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const data = await res.json();

      const alreadyLiked = data.likes?.some((p) => p.id === product.id);
      const updatedLikes = alreadyLiked
        ? data.likes.filter((p) => p.id !== product.id)
        : [...(data.likes || []), product];

      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, likes: updatedLikes }),
      });

      setLiked(!alreadyLiked);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  const handleCart = async () => {
    if (!user) return alert("Пожалуйста, войдите в аккаунт.");

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const data = await res.json();

      const existing = data.cart?.find((c) => c.product.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = data.cart.map((c) =>
          c.product.id === product.id ? { ...c, count: c.count + 1 } : c
        );
      } else {
        updatedCart = [...(data.cart || []), { product, count: 1 }];
      }

      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cart: updatedCart }),
      });

      setInCart(true);
      setCount(existing ? existing.count + 1 : 1);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const handleCountChange = async (delta) => {
    if (!user || !inCart) return;

    const newCount = count + delta;

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const data = await res.json();

      if (newCount < 1) {
        const updatedCart = data.cart.filter(
          (c) => c.product.id !== product.id
        );

        await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, cart: updatedCart }),
        });

        setInCart(false);
        setCount(1);
        return;
      }

      const updatedCart = data.cart.map((c) =>
        c.product.id === product.id ? { ...c, count: newCount } : c
      );

      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cart: updatedCart }),
      });

      setCount(newCount);
    } catch (err) {
      console.error("Error updating cart count:", err);
    }
  };

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product) setSelectedImage(product.media?.[0]);
  }, [product]);

  if (loading || !product) return <p>Загрузка...</p>;

  return (
    <div className="container">
      <Header />

      <section className={styles.product_box}>
        <div className={styles.product_details}>
          <div className={styles.product_details_img}>
            <div className={styles.thumbnails}>
              {product.media.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={`${styles.thumbnail} ${selectedImage === img ? styles.active : ""
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            <div className={styles.mainImageContainer}>
              <img src={selectedImage} alt={product.title} className={styles.mainImage} />
            </div>
          </div>


          <div className={styles.product_details_info}>
            <h1 className={styles.product_title}>{product.title}</h1>

            <p className={styles.product_price}>
              <span>{product.price.toLocaleString("ru-RU")} сум</span>
              <span>
                {(product.price + 100001).toLocaleString("ru-RU")} сум
              </span>
            </p>

            {/* Counter (only if in cart) */}
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
          <h1 className={styles.productSlider__wrapper_h1}>Кухонные товары</h1>
          <MainSlider goods={goods} filterType={product.type} slideNumber={5} />
        </div>
      </section>
    </div>
  );
}
