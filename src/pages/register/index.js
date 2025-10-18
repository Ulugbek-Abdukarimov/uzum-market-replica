import styles from "./register.module.css";
import AuthLayout from "@/shared/ui/auth-register-layout";
import AuthInput from "@/shared/ui/auth-input";
import AuthButton from "@/shared/ui/auth-button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { register as registerUser } from "@/shared/hooks/useAuth";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);

    
    if (data.password !== data.passwordVerification) {
      alert("Parollar mos kelmadi!");
      setLoading(false);
      return;
    }

    
    const response = await registerUser({
      name: data.fullName,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (response.user) {
      alert("Ro‘yxatdan o‘tish muvaffaqiyatli! Iltimos, tizimga kiring.");
      router.push("/login"); 
    } else {
      alert(response.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <AuthInput
            type="text"
            id="fullName"
            placeholder="To‘liq ism"
            required
            {...register("fullName")}
          />
          <AuthInput
            type="email"
            id="email"
            placeholder="Email"
            required
            {...register("email")}
          />
          <AuthInput
            type="password"
            id="password"
            placeholder="Parol"
            required
            {...register("password")}
          />
          <AuthInput
            type="password"
            id="passwordVerification"
            placeholder="Parolni tasdiqlang"
            required
            {...register("passwordVerification")}
          />
        </div>

        <div className={styles.button}>
          <AuthButton>{loading ? "Jarayon..." : "Ro‘yxatdan o‘tish"}</AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
