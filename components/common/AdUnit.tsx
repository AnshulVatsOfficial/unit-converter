"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot: string; // AdSense slot id (required)
  format?: string; // "auto" by default
  fullWidth?: boolean; // responsive option
  className?: string; // extra styling if needed
}

export default function AdUnit({
  slot,
  format = "auto",
  fullWidth = true,
  className = "",
}: AdUnitProps) {
  useEffect(() => {
    try {
      // Initialize adsbygoogle each time component mounts
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <>
      {/* Global loader script only loads once even if repeated */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7211777208376091"
        crossOrigin="anonymous"
      />

      <ins
        className={`adsbygoogle ${className}`}
        style={{ display: "block" }}
        data-ad-client="ca-pub-7211777208376091"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      ></ins>
    </>
  );
}
