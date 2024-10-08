import mockEvent from "./event";

const mockUsers = [
	{
		handle: "johndoe",
		authID: "auth0|12345",
		name: "John Doe",
		birthday: "1990-05-20",
		occupation: "Software Developer",
		isStudent: false,
		avatar: "avatar-johndoe",
		links: ["https://twitter.com/johndoe", "https://github.com/johndoe"],
		biography: "I am a software developer with a passion for music and events.",
		visibility: "PUBLIC",
		created: new Date("2022-01-01T10:00:00Z"),
		lastModified: new Date("2023-06-01T15:00:00Z"),
		lastSeen: new Date(),
		follows: [
			{
				handle: "janedoe",
				authID: "auth0|67890",
				name: "Jane Doe",
				birthday: "1992-08-15",
				occupation: "Graphic Designer",
				isStudent: false,
				avatar: "avatar-janedoe",
				links: ["https://linkedin.com/in/janedoe"],
				biography: "Creative graphic designer and visual artist.",
				visibility: "FRIENDS_ONLY",
				created: new Date("2022-02-01T10:00:00Z"),
				lastModified: new Date("2023-06-01T17:00:00Z"),
				lastSeen: new Date(),
				follows: [],
				followers: [],
				liked: [mockEvent],
			},
		],
		followers: [
			{
				handle: "janedoe",
				authID: "auth0|67890",
				name: "Jane Doe",
				birthday: "1992-08-15",
				occupation: "Graphic Designer",
				isStudent: false,
				avatar: "avatar-janedoe",
				links: ["https://linkedin.com/in/janedoe"],
				biography: "Creative graphic designer and visual artist.",
				visibility: "FRIENDS_ONLY",
				created: new Date("2022-02-01T10:00:00Z"),
				lastModified: new Date("2023-06-01T17:00:00Z"),
				lastSeen: new Date(),
				follows: [],
				followers: [],
				liked: [mockEvent],
			},
		],
		liked: [mockEvent],
	},
];

export { mockUsers };
