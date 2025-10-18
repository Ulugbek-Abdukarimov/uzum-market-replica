"use client"; // required if you use hooks, localStorage, etc.

import { useGoods } from "@/shared/helpers/request.js";
import Header from "@/widgets/header";

export default function FavoritesPage() {
  const { goods, loading } = useGoods();

  if (loading) return <p>Loading...</p>;

  const favoriteGoods = goods.filter((good) => good.isFavorite); // example filter

  return (
    <div className="container">
      <Header />
      <h1>Favorites</h1>
      <ul>
        {favoriteGoods.length > 0 ? (
          favoriteGoods.map((item) => (
            <li key={item.id}>
              <img src={item.media[0]} alt={item.title} width={100} />
              <p>{item.title}</p>
            </li>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </ul>
    </div>
  );
}   