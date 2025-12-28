"use client";

import Script from "next/script";

export default function AdsterraNative() {
  return (
    <div className="w-full flex justify-center my-6">
      <Script
        async
        data-cfasync="false"
        src="https://foreignabnormality.com/6114a3778bfb9a9d6183ff676addd374/invoke.js"
        strategy="afterInteractive"
      />
      <div
        id="container-6114a3778bfb9a9d6183ff676addd374"
        className="w-full max-w-[728px]"
      />
    </div>
  );
}
