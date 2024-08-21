export interface RangeSliderProps {
	value: number[];
	onChange: (event: Event, newValue: number | number[]) => void;
}

export interface PriceRangeProps {
	low: number; // Mandatory prop with value from parent
	high: number; // Mandatory prop with value from parent
}
