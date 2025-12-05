import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/conversions/length/length";
import { ResultsListProps } from "@/types/common/results-list";

export function LengthResultsList({
  results,
  selectedUnit,
  onSelect,
  label,
}: ResultsListProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="converter-card overflow-hidden">
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-border/40">
            {results.map(({ unit, value }) => (
              <button
                key={unit.id}
                onClick={() => onSelect(unit)}
                className={cn(
                  "unit-list-item w-full text-left flex items-center justify-between gap-3",
                  selectedUnit.id === unit.id && "selected"
                )}
              >
                <span className="font-medium truncate">{unit.name}</span>
                <span
                  className={cn(
                    "result-value text-sm shrink-0",
                    selectedUnit.id === unit.id
                      ? "text-primary-foreground"
                      : "text-foreground"
                  )}
                >
                  {formatNumber(value)}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
