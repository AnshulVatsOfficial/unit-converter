// components/AdSenseAd.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  adClient?: string; // e.g. "ca-pub-7211777208376091"
  adSlot?: string; // e.g. "1234567890"
  style?: React.CSSProperties;
  className?: string;
};

export default function AdSenseAd({
  adClient,
  adSlot,
  style,
  className,
}: Props) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // ensure adsbygoogle exists
    // @ts-ignore
    if (
      typeof window !== "undefined" &&
      (window as any).adsbygoogle &&
      ref.current
    ) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore push errors
        // console.warn("adsbygoogle push failed", e);
      }
    }
  }, []);

  // NOTE: pass actual adClient (publisher id) and adSlot here
  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        ref={ref}
        style={{ display: "block" }}
        data-ad-client={adClient ?? "ca-pub-7211777208376091"}
        data-ad-slot={adSlot ?? "YOUR_AD_SLOT_ID"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
