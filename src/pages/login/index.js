import AuthLayout from "@/shared/ui/auth-layout"
import AuthInput from "@/shared/ui/auth-input";

export default function Page(){
    return(
        <AuthLayout buttonText="Kirish">
            <AuthInput type="text"  id="email" placeholder="Email" required />
            <AuthInput type="password"  id="password" placeholder="Parol" required />
        </AuthLayout>
    )
}