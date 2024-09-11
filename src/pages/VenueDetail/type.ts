export interface UserHeaderProps {
	imgUrl: string;
	name: string;
	subname: string;
}

export interface SocialIconProps {
	icon: string; // Assuming icon is a URL string
	text?: string; // Making text optional
}

export interface MapProps {
	coordinates: number[]; // URL for the map image
	address?: string; // Address text, optional
}