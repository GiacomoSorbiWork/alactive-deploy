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
	selectedRange: [Dayjs | null, Dayjs | null];
	setSelectedRange?: (value: [Dayjs | null, Dayjs | null]) => void;
}
