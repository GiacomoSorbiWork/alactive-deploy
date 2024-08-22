export interface ProfileListType {
	img: string; // The source URL for the image
	title: string; // The title or label to display
	text?: string; // The associated text or value
	type?: string; // The associated type
}

export interface ProfileType {
	imgUrl?: string; // Optional image URL for the profile
	title?: string; // Optional title for the profile
	subTitle?: string; // Optional subtitle for the profile
	userName?: string; // Optional username
	birthday?: string; // Optional birthday
}
