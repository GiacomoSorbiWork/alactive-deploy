const mockAccessPolicies = [
	{
		type: "General Admission",
		minPrice: "10",
		maxPrice: "50",
		currency: "USD",
		info: "General access to the event with no additional perks.",
	},
	{
		type: "VIP",
		minPrice: "100",
		maxPrice: "300",
		currency: "USD",
		info: "VIP access with reserved seating and other perks.",
	},
	{
		type: "Backstage Pass",
		minPrice: "500",
		maxPrice: "1000",
		currency: "USD",
		info: "Exclusive access to backstage with the performers.",
	},
];

const mockRules = [
	{
		icon: "👕",
		text: "Dress code is casual. No formal wear required.",
	},
	{
		icon: "🎒",
		text: "No large bags or backpacks allowed.",
	},
	{
		icon: "🍔",
		text: "Outside food and drinks are not permitted.",
	},
	{
		icon: "🚭",
		text: "The event is non-smoking. Please use designated areas.",
	},
];

const mockRuleSections = [
	{
		title: "General Rules",
		rules: [
			{
				icon: "👕",
				text: "Dress code is casual. No formal wear required.",
			},
			{
				icon: "🎒",
				text: "No large bags or backpacks allowed.",
			},
		],
	},
	{
		title: "Food and Drink",
		rules: [
			{
				icon: "🍔",
				text: "Outside food and drinks are not permitted.",
			},
		],
	},
	{
		title: "Smoking",
		rules: [
			{
				icon: "🚭",
				text: "The event is non-smoking. Please use designated areas.",
			},
		],
	},
];

const mockVenue = {
	name: "City Stadium",
	address: "123 Main Street, Hometown",
};

const mockEvent = {
	id: "event-12345",
	name: "Summer Music Festival",
	description:
		"A grand festival featuring various music genres and popular artists.",
	musicGenres: ["Electronic", "Pop", "Hip Hop", "Rock"],
	video: "video-12345",
	media: ["image-12345", "video-12346"],
	accessPolicies: mockAccessPolicies,
	rules: mockRuleSections,
	datetime: new Date("2023-08-01T18:00:00Z"),
	duration: 14400, // 4 hours in seconds
	created: new Date("2023-01-01T10:00:00Z"),
	lastModified: new Date("2023-06-01T15:00:00Z"),
	hostedBy: mockVenue,
};

export default mockEvent;
