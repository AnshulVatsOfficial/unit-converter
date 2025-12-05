import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AreaUnit } from "@/types/area/area";

interface AreaUnitSelectorProps {
  units: AreaUnit[];
  selectedUnit: AreaUnit;
  onSelect: (unit: AreaUnit) => void;
  label: string;
}

export function AreaUnitSelector({
  units,
  selectedUnit,
  onSelect,
  label,
}: AreaUnitSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="converter-card overflow-hidden">
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-border/40">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => onSelect(unit)}
                className={cn(
                  "unit-list-item w-full text-left flex items-center justify-between gap-2",
                  selectedUnit.id === unit.id && "selected"
                )}
              >
                <span className="font-medium">{unit.name}</span>
                <span
                  className={cn(
                    "text-sm",
                    selectedUnit.id === unit.id
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {unit.symbol}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
