"use client";

import Script from "next/script";

export default function AdsterraBanner728() {
  return (
    <div className="hidden lg:flex justify-center my-6">
      <Script
        id="adsterra-728-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key': 'b8f3de4b82bc0efb796afe6a4841a165',
              'format': 'iframe',
              'height': 90,
              'width': 728,
              'params': {}
            };
          `,
        }}
      />
      <Script
        src="https://foreignabnormality.com/b8f3de4b82bc0efb796afe6a4841a165/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
