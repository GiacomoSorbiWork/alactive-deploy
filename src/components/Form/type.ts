import { ChangeEvent } from "react";

export interface FormProps {
	title: string;
	label: string;
	value: string | Date | null;
	text?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onDateChange?: (date: Date | null) => void;
	checkValue?: string;
	visibleCheckboxes?: boolean;
	isSubscribed?: boolean;
	handleSubscribed?: (subscribed: boolean) => void;
}
