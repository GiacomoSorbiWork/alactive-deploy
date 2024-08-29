export interface EventHeaderProps {
	title: string;
	subtitle: string;
	date: string;
	startingTime: string;
}

export interface MusicGenresProps {
	fields: string[];
}

export interface LineUpProps {
	avatar: string;
	userName: string;
}

export interface IntroduceGroupProps {
	imgUrl: string; // URL for the image
	mapUrl: string; // URL for the map image
	title: string; // Title text
	subTitle: string; // Subtitle text
	address?: string; // Address text, optional
	parkingAvailable?: boolean; // Boolean indicating parking availability, optional
	text?: string; // Additional text, optional
}

export interface HostProps {
	imgUrl: string; // URL for the image
	title: string; // Title text
	subTitle: string; // Subtitle text
	text?: string; // Additional text, optional
}

export interface IconTextProps {
	img: string;
	text: string;
	dividerState?: boolean;
}

export interface BookListProps {
	svg: string;
	title: string;
	subTitle: string;
	onClick?: () => void;
	className?: string;
}
