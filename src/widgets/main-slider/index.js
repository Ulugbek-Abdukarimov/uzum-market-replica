import styles from "./main-slider.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "@/shared/ui/product-card";



export default function MainSlider({ goods, filterType, slideNumber }){
    

    return(
        <Swiper
          spaceBetween={40}
          slidesPerView={slideNumber} 
          centeredSlides={true}    
          centeredSlidesBounds={true}     
          slideToClickedSlide={true} 
          speed={500}
          className={styles.productSlider__swiper} 
        >
            {goods
              .filter((good) => good.type === filterType)
              .map((good) => (
                <SwiperSlide key={good.id}>
                  <ProductCard good={good} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
