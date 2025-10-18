import styles from "./login.module.css";
import AuthLayout from "@/shared/ui/auth-layout";
import AuthInput from "@/shared/ui/auth-input";
import AuthButton from "@/shared/ui/auth-button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "@/shared/hooks/useAuth";
import { useRouter } from "next/router";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (user) => {
    setLoading(true);
    const response = await login(user);
    setLoading(false);

    if (response.user) {
      localStorage.setItem(
        "uzum-user",
        JSON.stringify({
          id: response.user.id,
          name: response.user.name,
        })
      );
      router.push("/home");
    } else {
      alert(response.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <AuthInput type="email" placeholder="Email" required {...register("email")} />
          <AuthInput type="password" placeholder="Parol" required {...register("password")} />
        </div>
        <div className={styles.button}>
          <AuthButton>{loading ? "Jarayon..." : "Kirish"}</AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
