import Hls from "hls.js";

const playM3u8 = (src: string, video: HTMLVideoElement) => {
	if (src && video) {
		const hls = new Hls();
		hls.loadSource(src);
		hls.attachMedia(video);
	} else {
		console.error("Invalid source or video element");
	}
};

export default playM3u8;
