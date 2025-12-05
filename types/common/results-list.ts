import { LengthUnit } from "../length/length";

export interface ResultsListProps {
  results: { unit: LengthUnit; value: number }[];
  selectedUnit: LengthUnit;
  onSelect: (unit: LengthUnit) => void;
  label: string;
}
