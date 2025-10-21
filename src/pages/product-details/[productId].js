"use client";
import { useRouter } from "next/router"; 
import styles from "./product-details.module.css";
import Header from "@/widgets/header";
import { useGoods } from "@/shared/helpers/request";
import MainSlider from "@/widgets/main-slider";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { productId } = router.query; 
  const { goods, loading } = useGoods();

  if (loading || !productId) return <p>Loading...</p>;

  // Find the product by ID
  const product = goods.find(
  (item) => String(item.id) === String(productId)
);
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container">
      <Header />

      <section className={styles.product_box}>
        <div className={styles.product_details}>
          <div className={styles.product_details_img}>
            <img src={product.media[0]} alt={product.title} />
          </div>

          <div className={styles.product_details_info}>
            <h1 className={styles.product_title}>{product.title}</h1>

            <p className={styles.product_price}>
              <span>{product.price.toLocaleString("ru-RU")} сум</span>
              <span>{(product.price + 100001).toLocaleString("ru-RU")} сум</span>
            </p>

            <div className={styles.product_counter}>
              <span>-</span>1<span>+</span>
            </div>

            <hr className={styles.hr} />

            <p className={styles.product_info}>{product.description}</p>

            <div className={styles.product_buttons}>
              <button>Добавить в корзину</button>
              <button>Добавить в избранное</button>
            </div>
          </div>
        </div>

        <div className={styles.product_describtion}>
          <div>
            <h2>Описание товара</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.productSlider__wrapper}>
          <h1 className={styles.productSlider__wrapper_h1}>Кухонные товары</h1>
          <MainSlider goods={goods} filterType={product.type} slideNumber={5} />
        </div>
      </section>
    </div>
  );
}
