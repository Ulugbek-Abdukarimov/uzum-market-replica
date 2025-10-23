"use client";
import styles from "./home.module.css";
import Header from "@/widgets/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoods } from "@/shared/helpers/request.js";
import MainSlider from "@/widgets/main-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ProductCard from "@/shared/ui/product-card";
import Link from "next/link"; // ✅ added

export default function Page() {
  const { goods, loading } = useGoods();
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
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
        <div className={styles.top_item_box}>
          <div className={styles.customPrev}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className={styles.customNext}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            navigation={{
              nextEl: `.${styles.customNext}`,
              prevEl: `.${styles.customPrev}`,
            }}
            speed={2000}
          >
            {goods
              .filter((good) => good.isBlackFriday === true)
              .map((good) => (
                <SwiperSlide key={good.id}>
                  {/* ✅ Added clickable Link around the slide content */}
                  <Link
                    href={`/product-details/${good.id}`}
                    className={styles.slideLink}
                  >
                    <div className={styles.auto_slide_wrapper}>
                      <div className={styles.auto_slide_content}>
                        <h1>{good.title}</h1>
                        <p>{good.price.toLocaleString("ru-RU")} сум</p>
                        <p>{good.description}</p>
                      </div>

                      <div className={styles.productSlider__image}>
                        <img src={good.media[0]} alt={good.title} />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className={styles.popular_section}>
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
        </div>
      </section>

      <section>
        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>
            Кухонные товары
          </h1>
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
