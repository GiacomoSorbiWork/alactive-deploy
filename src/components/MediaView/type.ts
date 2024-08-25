export type Media = {
	type: "image" | "video";
	src: string;
	alt?: string;
};

export interface MediaViewProps {
	items: Media[];
}
