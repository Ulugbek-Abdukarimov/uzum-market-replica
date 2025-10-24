import "@/styles/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { UserDataProvider } from "@/shared/ui/context/UserDataContext";

export default function App({ Component, pageProps }) {
  return (
    <UserDataProvider>
      <Component {...pageProps} />
    </UserDataProvider>
  );
}
