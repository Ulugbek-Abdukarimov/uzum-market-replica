import { useState } from "react";
import styles from "./product-card.module.css"




export default function ProductCard({ good }){

    const [liked, setLiked] = useState(false); 

    const toggleLike = () => {
      setLiked(!liked);
    };

    return(
        <div className={styles.productSlider__card}>
            <div className={styles.productSlider__image}>
                <img src={good.media[0]} alt={good.title}/>
            </div>
            <p className={styles.productSlider__title}>
                {good.title}
            </p>
            <div className={styles.productSlider__price}>
                <p>
                    {(good.price + 100001).toLocaleString('ru-RU')} сум
                </p>
                <p>
                    {good.price.toLocaleString('ru-RU')} сум
                </p>
            </div>

            <span className={styles.shopping_cart}>
                <img src="./icons/shopping-cart.png" alt="#Shopping_Cart"/>
            </span>
            
            <span className={`${styles.liked} ${liked ? styles.notLiked : ""}`}
            onClick={toggleLike}>
                <i class="fa-regular fa-heart"></i>
            </span>
        </div>
    )
}