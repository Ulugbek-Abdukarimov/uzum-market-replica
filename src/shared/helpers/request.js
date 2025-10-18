"use client";
import { useEffect, useState } from "react";

export function useGoods() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoods() {
      try {
        const res = await fetch("http://localhost:3001/goods");
        if (!res.ok) throw new Error("Failed to fetch goods");
        const data = await res.json();
        setGoods(data);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGoods();
  }, []);

  return { goods, loading };
}