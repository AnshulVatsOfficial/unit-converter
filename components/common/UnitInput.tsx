import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnitInputProps } from "@/types/common/unit-input";

export function UnitInput({
  label,
  value,
  onChange,
  readOnly = false,
  placeholder = "0",
}: UnitInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <Input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className="input-number h-14 bg-card border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
