// import { ScrollArea } from "@/components/ui/scroll-area";
// import { formatNumber } from "@/conversions/area/area";
// import { cn } from "@/lib/utils";
// import { AreaUnit } from "@/types/area/area";

// interface AreaResultsListProps {
//   results: { unit: AreaUnit; value: number }[];
//   selectedUnit: AreaUnit;
//   onSelect: (unit: AreaUnit) => void;
//   label: string;
// }

// export function AreaResultsList({
//   results,
//   selectedUnit,
//   onSelect,
//   label,
// }: AreaResultsListProps) {
//   return (
//     <div className="space-y-2">
//       <p className="text-sm font-medium text-muted-foreground">{label}</p>
//       <div className="converter-card overflow-hidden">
//         <ScrollArea className="h-[320px]">
//           <div className="divide-y divide-border/40">
//             {results.map(({ unit, value }) => (
//               <button
//                 key={unit.id}
//                 onClick={() => onSelect(unit)}
//                 className={cn(
//                   "unit-list-item w-full text-left flex items-center justify-between gap-3",
//                   selectedUnit.id === unit.id && "selected"
//                 )}
//               >
//                 <span className="font-medium truncate">{unit.name}</span>
//                 <span
//                   className={cn(
//                     "result-value text-sm shrink-0",
//                     selectedUnit.id === unit.id
//                       ? "text-primary-foreground"
//                       : "text-foreground"
//                   )}
//                 >
//                   {formatNumber(value)}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </ScrollArea>
//       </div>
//     </div>
//   );
// }

// components/converters/area/AreaResultsList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatNumber } from "@/conversions/area/area";
import { cn } from "@/lib/utils";
import { AreaUnit } from "@/types/area/area";

interface AreaResultsListProps {
  results: { unit: AreaUnit; value: number }[];
  selectedUnit: AreaUnit;
  onSelect: (unit: AreaUnit) => void;
  label: string;
}

export function AreaResultsList({
  results,
  selectedUnit,
  onSelect,
  label,
}: AreaResultsListProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>

      <div className="converter-card overflow-hidden">
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-border/40">
            {results.map(({ unit, value }) => {
              const isSelected = selectedUnit?.id === unit.id;
              return (
                <button
                  type="button"
                  key={unit.id}
                  onClick={() => onSelect(unit)}
                  className={cn(
                    "unit-list-item w-full text-left flex items-center justify-between gap-3 px-4 py-3 hover:bg-accent/5 transition-all",
                    isSelected && "selected"
                  )}
                >
                  <span className="font-medium truncate">{unit.name}</span>
                  <span
                    className={cn(
                      "result-value text-sm shrink-0",
                      isSelected ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {formatNumber(value)}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
