import Script from 'next/script'
import { google_tracking_id } from "~/config/globalVariable"

export default function Index() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${google_tracking_id}`}
      />
      <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${google_tracking_id}', { page_path: window.location.pathname });
            `,
          }}
        />
    </>
  )
}