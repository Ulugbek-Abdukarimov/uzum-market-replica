"use client";
import styles from "./home.module.css";
import Header from "@/widgets/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoods } from "@/shared/helpers/request.js";
import MainSlider from "@/widgets/main-slider";


export default function Page() {
  const { goods, loading } = useGoods();
  const [authChecked, setAuthChecked] = useState(false); 
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem("uzum-user");
    if (!storedUser) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);


  if (!authChecked ||loading ) return null;

  return (
    <div id="home-page" className="container">
      <Header />
      <div className={styles.productSlider__wrapper}>
        <h1 className={styles.productSlider__wrapper_h1}>Системные блоки / ПК</h1>
        <MainSlider goods={goods} filterType="PC" />
      </div> 

      <div className={styles.productSlider__wrapper}>
        <h1 className={styles.productSlider__wrapper_h1}>Компьютерные кресла</h1>
        <MainSlider goods={goods} filterType="furniture" />
      </div> 

      <div className={styles.productSlider__wrapper}>
        <h1 className={styles.productSlider__wrapper_h1}>Аудиотехника</h1>
        <MainSlider goods={goods} filterType="audio" />
      </div> 

      <div className={styles.productSlider__wrapper}>
        <h1 className={styles.productSlider__wrapper_h1}>Телевизоры</h1>
        <MainSlider goods={goods} filterType="TV" />
      </div> 
    </div>
  );
}

        