import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import styles from "./TopItemBox.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TopItemBox({ goods }) {
  return (
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
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ dynamicBullets: true, clickable: true }}
        navigation={{
          nextEl: `.${styles.customNext}`,
          prevEl: `.${styles.customPrev}`,
        }}
        speed={2000}
      >
        {goods
          .filter((good) => good.isBlackFriday)
          .map((good) => (
            <SwiperSlide key={good.id}>
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
  );
}
