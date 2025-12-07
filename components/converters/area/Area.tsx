"use client";

import { useState, useMemo } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnitInput } from "@/components/common/UnitInput";
import {
  areaUnits,
  convertToAllAreaUnits,
  formatNumber,
} from "@/conversions/area/area";
import { toast } from "sonner";
import { AreaUnit } from "@/types/area/area";
import { AreaUnitSelector } from "./AreaUnitSelector";
import { AreaResultsList } from "./AreaResultsList";

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<AreaUnit>(areaUnits[0]); // Square Meter
  const [toUnit, setToUnit] = useState<AreaUnit>(areaUnits[1]); // Square Kilometer
  const [copied, setCopied] = useState(false);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const allResults = useMemo(() => {
    return convertToAllAreaUnits(numericValue, fromUnit);
  }, [numericValue, fromUnit]);

  const primaryResult = useMemo(() => {
    return allResults.find((r) => r.unit.id === toUnit.id)?.value ?? 0;
  }, [allResults, toUnit]);

  const handleSwap = () => {
    const newFromUnit = toUnit;
    const newToUnit = fromUnit;
    setFromUnit(newFromUnit);
    setToUnit(newToUnit);
    // Update input to the converted value
    setInputValue(formatNumber(primaryResult).replace(/,/g, ""));
  };

  const handleCopy = async () => {
    const text = `${inputValue} ${fromUnit.symbol} = ${formatNumber(
      primaryResult
    )} ${toUnit.symbol}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFromUnitSelect = (unit: AreaUnit) => {
    setFromUnit(unit);
  };

  const handleToUnitSelect = (unit: AreaUnit) => {
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
        <AreaUnitSelector
          units={areaUnits}
          selectedUnit={fromUnit}
          onSelect={handleFromUnitSelect}
          label="Select source unit"
        />
        <AreaResultsList
          results={allResults}
          selectedUnit={toUnit}
          onSelect={handleToUnitSelect}
          label="All conversions"
        />
      </div>
    </div>
  );
}
