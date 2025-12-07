"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnitInput } from "@/components/common/UnitInput";
import { LengthUnitSelector } from "@/components/converters/length/LengthUnitSelector";
import { LengthResultsList } from "@/components/converters/length/LengthResultsList";
import { convertToAllUnits, formatNumber } from "@/conversions/length/length";
import { LengthUnit } from "@/types/length/length";
import unitsJson from "@/data/units.json";
import { toast } from "sonner";

type Props = {
  /** optional ids (unit.id) to preselect when hydrating from an SSG page */
  defaultFromId?: string;
  defaultToId?: string;
  defaultValue?: string; // string to match your input value type
};

/** Helper: pretty name builder for ids like "light_year" -> "Light Year" */
function prettyNameFromId(id: string) {
  return id
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Build lengthUnits from data/units.json (single source of truth) */
const lengthUnits: LengthUnit[] = Object.entries(
  (unitsJson as any).length.units
).map(([id, u]: [string, any]) => ({
  id,
  name: prettyNameFromId(id),
  symbol: u.symbol ?? id,
  // conversions code expects `toMeters` property
  toMeters: u.toBase ?? u.toMeters ?? 1,
}));

export default function LengthConverter({
  defaultFromId,
  defaultToId,
  defaultValue,
}: Props) {
  // choose initial unit objects (fallback to existing defaults)
  const initialFrom =
    lengthUnits.find((u) => u.id === defaultFromId) ?? lengthUnits[0];
  const initialTo =
    lengthUnits.find((u) => u.id === defaultToId) ??
    lengthUnits[1] ??
    lengthUnits[0];

  const [inputValue, setInputValue] = useState<string>(defaultValue ?? "1");
  const [fromUnit, setFromUnit] = useState<LengthUnit>(initialFrom);
  const [toUnit, setToUnit] = useState<LengthUnit>(initialTo);
  const [copied, setCopied] = useState(false);

  // If props change after mount (unlikely) sync them
  useEffect(() => {
    if (defaultFromId) {
      const f = lengthUnits.find((u) => u.id === defaultFromId);
      if (f) setFromUnit(f);
    }
  }, [defaultFromId]);

  useEffect(() => {
    if (defaultToId) {
      const t = lengthUnits.find((u) => u.id === defaultToId);
      if (t) setToUnit(t);
    }
  }, [defaultToId]);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // convertToAllUnits expects the "fromUnit" to have the same shape as its internal unit list.
  // Because we derived lengthUnits from the same JSON, shapes match.
  const allResults = useMemo(() => {
    return convertToAllUnits(numericValue, fromUnit);
  }, [numericValue, fromUnit]);

  const primaryResult = useMemo(() => {
    return allResults.find((r) => r.unit.id === toUnit.id)?.value ?? 0;
  }, [allResults, toUnit]);

  const handleSwap = () => {
    const newFromUnit = toUnit;
    const newToUnit = fromUnit;
    setFromUnit(newFromUnit);
    setToUnit(newToUnit);
    // Update input to the converted value (keep same formatting behavior)
    setInputValue(formatNumber(primaryResult).replace(/,/g, ""));
  };

  const handleCopy = async () => {
    const text = `${inputValue} ${fromUnit.symbol} = ${formatNumber(
      primaryResult
    )} ${toUnit.symbol}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error?.("Could not copy");
    }
  };

  const handleFromUnitSelect = (unit: LengthUnit) => {
    setFromUnit(unit);
  };

  const handleToUnitSelect = (unit: LengthUnit) => {
    setToUnit(unit);
  };

  return (
    <div className="space-y-6">
      {/* Main conversion display */}
      <div className="converter-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <UnitInput
            label="From:"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter value"
          />

          <div className="flex justify-center md:pb-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="rounded-full h-10 w-10 border-border/60 hover:bg-accent hover:border-primary/30 transition-all"
              title="Swap units"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                To:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3 w-3 mr-1" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                Copy
              </Button>
            </div>
            <div className="h-14 px-4 bg-muted/50 border border-border/60 rounded-lg flex items-center">
              <span className="input-number text-foreground truncate">
                {formatNumber(primaryResult)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick formula display */}
        <div className="mt-4 pt-4 border-t border-border/40">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-mono">{inputValue || "0"}</span>
            <span className="mx-1">{fromUnit.symbol}</span>
            <span className="mx-2">=</span>
            <span className="font-mono font-medium text-foreground">
              {formatNumber(primaryResult)}
            </span>
            <span className="ml-1">{toUnit.symbol}</span>
          </p>
        </div>
      </div>

      {/* Unit selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LengthUnitSelector
          units={lengthUnits}
          selectedUnit={fromUnit}
          onSelect={handleFromUnitSelect}
          label="Select source unit"
        />
        <LengthResultsList
          results={allResults}
          selectedUnit={toUnit}
          onSelect={handleToUnitSelect}
          label="All conversions"
        />
      </div>
    </div>
  );
}
