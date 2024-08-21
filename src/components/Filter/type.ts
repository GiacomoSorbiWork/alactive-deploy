import { Dayjs } from "dayjs";

export interface BudgetProps {
	isOpen: boolean;
	onToggle: () => void;
	value: number[];
	onChange: (newValue: number[]) => void;
}

export interface LocationProps {
	isOpen: boolean;
	onToggle: () => void;
	value: string;
	onChange: (value: string) => void;
}

export interface WhenProps {
	isOpen: boolean;
	onToggle: () => void;
	selectedMonth: Dayjs | null;
	setSelectedMonth: (value: Dayjs | null) => void;
	selectedYear: Dayjs | null;
	setSelectedYear: (value: Dayjs | null) => void;
}

export interface DatePickerFieldProps {
	label: "Month" | "Year";
	value: Dayjs | null;
	onChange: (newValue: Dayjs | null) => void;
	onClear: () => void;
}
