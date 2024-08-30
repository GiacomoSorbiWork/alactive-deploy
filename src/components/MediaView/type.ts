export type Media = {
	type: "image" | "video";
	src: string;
	alt?: string;
};

export interface MediaViewProps {
	items: Array<{ type: string; src: string; alt?: string }>;
	handleIndexChange?: (index: number) => void; // Optional function
}
