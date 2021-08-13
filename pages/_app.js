import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/all.scss'
import '../components/cat-page-style.scss'
import '../components/ProductDetailTemplate.scss'
import { useRouter } from 'next/router';
import { google_tracking_id } from "~/config/globalVariable";
import { useEffect } from "react"

const App = ({ Component, pageProps }) => {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', google_tracking_id, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />
}

export default App
