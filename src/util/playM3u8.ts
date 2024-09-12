import Hls from "hls.js";

const playM3u8 = async (src: string, video: HTMLVideoElement) => {
  if (src && video) {
    const hls = new Hls();
    await hls.loadSource(src);
    await hls.attachMedia(video);
    video.addEventListener("click", () => {
      video.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    });
  } else {
    console.error("Invalid source or video element");
  }
};

export default playM3u8;
