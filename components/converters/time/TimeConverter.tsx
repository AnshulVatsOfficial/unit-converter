// "use client";

// import { useState, useMemo } from "react";
// import { ArrowRightLeft, Copy, Check } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   timeUnits,
//   TimeUnit,
//   convertTime,
//   convertToAllTimeUnits,
//   formatTimeNumber,
// } from "@/conversions/time/time";
// import { toast } from "sonner";
// import { UnitInput } from "@/components/common/UnitInput";
// import { TimeUnitSelector } from "./TimeUnitSelector";
// import { TimeResultsList } from "./TimeResultsList";

// export function TimeConverter() {
//   const [inputValue, setInputValue] = useState<string>("1");
//   const [fromUnit, setFromUnit] = useState<TimeUnit>(timeUnits[0]);
//   const [toUnit, setToUnit] = useState<TimeUnit>(timeUnits[6]);
//   const [copied, setCopied] = useState(false);

//   const numericValue = useMemo(() => {
//     const parsed = parseFloat(inputValue);
//     return isNaN(parsed) ? 0 : parsed;
//   }, [inputValue]);

//   const allResults = useMemo(() => {
//     return convertToAllTimeUnits(numericValue, fromUnit);
//   }, [numericValue, fromUnit]);

//   const primaryResult = useMemo(() => {
//     return convertTime(numericValue, fromUnit, toUnit);
//   }, [numericValue, fromUnit, toUnit]);

//   const handleSwap = () => {
//     const newFromUnit = toUnit;
//     const newToUnit = fromUnit;
//     setFromUnit(newFromUnit);
//     setToUnit(newToUnit);
//     setInputValue(formatTimeNumber(primaryResult));
//   };

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(formatTimeNumber(primaryResult));
//     setCopied(true);
//     toast.success("Copied to clipboard");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleFromUnitSelect = (unit: TimeUnit) => {
//     setFromUnit(unit);
//   };

//   const handleToUnitSelect = (unit: TimeUnit) => {
//     setToUnit(unit);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="converter-card p-6">
//         <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
//           <UnitInput
//             label="From:"
//             value={inputValue}
//             onChange={setInputValue}
//             placeholder="Enter value"
//           />

//           <div className="flex justify-center md:pb-1">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleSwap}
//               className="rounded-full h-10 w-10 border-border/60 hover:bg-accent hover:border-primary/30 transition-all"
//               title="Swap units"
//             >
//               <ArrowRightLeft className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-muted-foreground">
//                 To:
//               </span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleCopy}
//                 className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
//               >
//                 {copied ? (
//                   <Check className="h-3 w-3 mr-1" />
//                 ) : (
//                   <Copy className="h-3 w-3 mr-1" />
//                 )}
//                 Copy
//               </Button>
//             </div>
//             <div className="h-14 px-4 bg-muted/50 border border-border/60 rounded-lg flex items-center">
//               <span className="input-number text-foreground truncate">
//                 {formatTimeNumber(primaryResult)}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 pt-4 border-t border-border/40">
//           <p className="text-sm text-muted-foreground text-center">
//             <span className="font-mono">{inputValue || "0"}</span>
//             <span className="mx-1">{fromUnit.symbol}</span>
//             <span className="mx-2">=</span>
//             <span className="font-mono font-medium text-foreground">
//               {formatTimeNumber(convertTime(1, fromUnit, toUnit))}
//             </span>
//             <span className="ml-1">{toUnit.symbol}</span>
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <TimeUnitSelector
//           units={timeUnits}
//           selectedUnit={fromUnit}
//           onSelect={handleFromUnitSelect}
//           label="Select source unit"
//         />

//         <TimeResultsList
//           results={allResults}
//           selectedUnit={toUnit}
//           onSelect={handleToUnitSelect}
//           label="Conversion results"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  timeUnits,
  TimeUnit,
  convertTime,
  convertToAllTimeUnits,
  formatTimeNumber,
} from "@/conversions/time/time";
import { toast } from "sonner";
import { UnitInput } from "@/components/common/UnitInput";
import { TimeUnitSelector } from "./TimeUnitSelector";
import { TimeResultsList } from "./TimeResultsList";

type Props = {
  defaultFromId?: string;
  defaultToId?: string;
  defaultValue?: string;
};

export default function TimeConverter({
  defaultFromId,
  defaultToId,
  defaultValue,
}: Props) {
  // choose initial unit objects (fallback to existing defaults)
  const initialFrom =
    timeUnits.find((u) => u.id === defaultFromId) ?? timeUnits[0];
  const initialTo =
    timeUnits.find((u) => u.id === defaultToId) ?? timeUnits[6] ?? timeUnits[0];

  const [inputValue, setInputValue] = useState<string>(defaultValue ?? "1");
  const [fromUnit, setFromUnit] = useState<TimeUnit>(initialFrom);
  const [toUnit, setToUnit] = useState<TimeUnit>(initialTo);
  const [copied, setCopied] = useState(false);

  // Sync when props change after mount (hydrate from SSG page)
  useEffect(() => {
    if (defaultFromId) {
      const f = timeUnits.find((u) => u.id === defaultFromId);
      if (f) setFromUnit(f);
    }
  }, [defaultFromId]);

  useEffect(() => {
    if (defaultToId) {
      const t = timeUnits.find((u) => u.id === defaultToId);
      if (t) setToUnit(t);
    }
  }, [defaultToId]);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const allResults = useMemo(() => {
    return convertToAllTimeUnits(numericValue, fromUnit);
  }, [numericValue, fromUnit]);

  const primaryResult = useMemo(() => {
    return convertTime(numericValue, fromUnit, toUnit);
  }, [numericValue, fromUnit, toUnit]);

  const handleSwap = () => {
    const newFromUnit = toUnit;
    const newToUnit = fromUnit;
    setFromUnit(newFromUnit);
    setToUnit(newToUnit);
    // Update input to the converted value (strip commas to keep numeric input clean)
    setInputValue(formatTimeNumber(primaryResult).replace(/,/g, ""));
  };

  const handleCopy = async () => {
    const text = `${inputValue} ${fromUnit.symbol} = ${formatTimeNumber(
      primaryResult
    )} ${toUnit.symbol}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error?.("Could not copy");
    }
  };

  const handleFromUnitSelect = (unit: TimeUnit) => {
    setFromUnit(unit);
  };

  const handleToUnitSelect = (unit: TimeUnit) => {
    setToUnit(unit);
  };

  return (
    <div className="space-y-6">
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
                {formatTimeNumber(primaryResult)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/40">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-mono">{inputValue || "0"}</span>
            <span className="mx-1">{fromUnit.symbol}</span>
            <span className="mx-2">=</span>
            <span className="font-mono font-medium text-foreground">
              {formatTimeNumber(convertTime(1, fromUnit, toUnit))}
            </span>
            <span className="ml-1">{toUnit.symbol}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimeUnitSelector
          units={timeUnits}
          selectedUnit={fromUnit}
          onSelect={handleFromUnitSelect}
          label="Select source unit"
        />

        <TimeResultsList
          results={allResults}
          selectedUnit={toUnit}
          onSelect={handleToUnitSelect}
          label="Conversion results"
        />
      </div>
    </div>
  );
}
