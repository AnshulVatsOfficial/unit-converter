import { Calculator } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 w-full px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-16 py-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">
            Unit<span className="text-primary">lab</span>
          </span>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Fast, accurate unit conversions for everyday use.
        </p>

        <div className="flex items-center gap-4">
          {/* 👇 Added Sitemap link */}
          <Link
            href="/sitemap-html"
            className="text-xs text-muted-foreground hover:text-foreground transition"
          >
            Sitemap
          </Link>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Unitlab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
