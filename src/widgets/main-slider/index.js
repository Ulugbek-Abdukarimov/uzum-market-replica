"use client";
import styles from "./main-slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "@/shared/ui/product-card";

export default function MainSlider({ goods, filterType, slideNumber = 5 }) {
  return (
    <Swiper
      className={styles.productSlider__swiper}
      spaceBetween={20}
      slidesPerView={slideNumber}
      centeredSlides={false}
      speed={500}
      breakpoints={{
        1400: {
          slidesPerView: Math.min(slideNumber, 5),
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: Math.min(slideNumber, 4),
          spaceBetween: 28,
        },
        768: {
          slidesPerView: Math.min(slideNumber, 3),
          spaceBetween: 20,
        },
        480: {
          slidesPerView: Math.min(slideNumber, 2),
          spaceBetween: 16,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
      }}
    >
      {goods
        .filter((good) => good.type === filterType)
        .map((good) => (
          <SwiperSlide key={good.id} className={styles.productSlider__slide}>
            <ProductCard good={good} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
