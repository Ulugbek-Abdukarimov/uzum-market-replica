"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/widgets/header";
import { useGoods } from "@/shared/helpers/request";
import MainSlider from "@/widgets/main-slider";
import ProductCard from "@/shared/ui/product-card";
import TopItemBox from "@/shared/ui/TopItemBox/TopItemBox";
import styles from "./home.module.css";

export default function HomePage() {
  const router = useRouter();
  const { goods, loading } = useGoods();
  const [authChecked, setAuthChecked] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("uzum-user");
    if (!storedUser) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked || loading) return null;

  return (
    <div id="home-page" className="container">
      <Header />

      <section>
        <TopItemBox goods={goods} />
      </section>

      <section className={styles.popular_section}>
        <h1 className={styles.productSlider__wrapper_h1}>Популярное</h1>

        <div
          className={`${styles.bottom_items} ${
            showAll ? styles.showAll : ""
          }`}
        >
          {goods
            .filter((good) => good.salePercentage > 0)
            .map((good) => (
              <ProductCard key={good.id} good={good} />
            ))}
        </div>

        <p className={styles.show_more}>
          <button onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Скрыть" : "Показать еще"}
          </button>
        </p>
      </section>

      <section>
        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>Кухонные товары</h1>
          <MainSlider goods={goods} filterType="kitchen" slideNumber={5} />
        </div>

        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>
            Системные блоки / ПК
          </h1>
          <MainSlider goods={goods} filterType="PC" slideNumber={5} />
        </div>

        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>
            Компьютерные кресла
          </h1>
          <MainSlider goods={goods} filterType="furniture" slideNumber={5} />
        </div>

        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>Аудиотехника</h1>
          <MainSlider goods={goods} filterType="audio" slideNumber={5} />
        </div>

        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>Телевизоры</h1>
          <MainSlider goods={goods} filterType="TV" slideNumber={5} />
        </div>
      </section>
    </div>
  );
}