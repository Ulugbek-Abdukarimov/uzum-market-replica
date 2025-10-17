import AuthLayout from "@/shared/ui/auth-register-layout"
import AuthInput from "@/shared/ui/auth-input";

export default function Page(){
    return(
        <AuthLayout buttonText="Ro‘yxatdan o‘tish">
            <AuthInput type="text"  id="fullName" placeholder="To‘liq ism" required />
            <AuthInput type="text"  id="email" placeholder="Email" required />
            <AuthInput type="password"  id="password" placeholder="Parol" required />
            <AuthInput type="passwordVerification"  id="password" placeholder="Parolni tasdiqlang" required />
        </AuthLayout>
    )
}