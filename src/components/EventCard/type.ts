export interface EventCardProps {
	imgUrl: string;
	cardId?: string;
	title: string;
	date: string;
	location: string;
	price: string | number;
	purpose?: string;
	isChecked?: boolean;
	selectFunc?: (item?: string) => void | undefined;
}
