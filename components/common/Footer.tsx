import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 w-full px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-16">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">
            Unit<span className="text-primary">Convert</span>
          </span>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Fast, accurate unit conversions for everyday use.
        </p>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} UnitConvert. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
