export interface EventCardProps {
	imgUrl?: string;
	videoUrl?: string;
	cardId?: string;
	title: string;
	titleLogo?: string;
	date?: string;
	location?: string;
	musicType?: string;
	price?: string | number;
	purpose?: string;
	isChecked?: boolean;
	selectFunc?: (item?: string) => void | undefined;
	nextURL?: string;
}
