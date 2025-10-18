"use client";
import Header from "@/widgets/header";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function Page() {
  const [goods, setGoods] = useState([]);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("uzum-user");
    if (!storedUser) {
      router.replace("/login"); // redirect if not logged in
    }
  }, [router]);

  // Fetch goods
  useEffect(() => {
    fetch("http://localhost:3001/goods")
      .then((res) => res.json())
      .then((data) => setGoods(data))
      .catch((err) => console.error("Ошибка при загрузке:", err));
  }, []);

  return (
    <div id="home-page" className="container">
      <Header />

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
      >
        {goods
          .filter((good) => good.type === "PC")
          .map((good) => (
            <SwiperSlide key={good.id}>
              <div className={styles.slideBox}>
                <img
                  src={good.media[0]}
                  alt={good.title}
                  className={styles.slideImage}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      
    </div>
  );
}
