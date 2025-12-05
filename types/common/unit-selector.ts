import { LengthUnit } from "../length/length";

export interface UnitSelectorProps {
  units: LengthUnit[];
  selectedUnit: LengthUnit;
  onSelect: (unit: LengthUnit) => void;
  label: string;
}