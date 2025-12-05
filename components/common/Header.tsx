"use client";

import { Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const { push } = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 flex h-16 shrink-0 items-center justify-between">
      <div
        role="button"
        onClick={() => push("/")}
        className="flex items-center gap-2 group"
      >
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <span className="font-semibold text-lg tracking-tight">
          Unit<span className="text-primary">Convert</span>
        </span>
      </div>
    </header>
  );
}
