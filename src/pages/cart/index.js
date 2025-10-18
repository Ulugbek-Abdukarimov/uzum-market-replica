"use client";

import { useGoods } from "@/shared/helpers/request.js";
import Header from "@/widgets/header";

export default function CartPage() {
  const { goods, loading } = useGoods();

  if (loading) return <p>Loading...</p>;

  const cartGoods = goods.filter((good) => good.type === "TV");

  // Optional: calculate total price
  const totalPrice = cartGoods.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="container">
      <Header />
      <h1>Корзина</h1>

      {cartGoods.length > 0 ? (
        <>
          <ul>
            {cartGoods.map((item) => (
              <li key={item.id} style={{ marginBottom: "20px" }}>
                <img src={item.media[0]} alt={item.title} width={100} />
                <p>{item.title}</p>
                <p>{item.price ? item.price + " сум" : "Цена не указана"}</p>
              </li>
            ))}
          </ul>
          <h3>Итого: {totalPrice.toLocaleString()} сум</h3>
        </>
      ) : (
        <p>Корзина пуста.</p>
      )}
    </div>
  );
}