"use client";

import Script from "next/script";

export default function AdsterraSidebarLeft() {
  return (
    <aside className="hidden lg:flex w-[160px] justify-center">
      <Script
        id="adsterra-left-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key': '135f0919610b81fae3d5500bbcf210c4',
              'format': 'iframe',
              'height': 600,
              'width': 160,
              'params': {}
            };
          `,
        }}
      />
      <Script
        src="https://foreignabnormality.com/135f0919610b81fae3d5500bbcf210c4/invoke.js"
        strategy="afterInteractive"
      />
    </aside>
  );
}
