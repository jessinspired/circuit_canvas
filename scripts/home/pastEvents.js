function initPastEventVideo() {
  let video = document.querySelector(".past-event-video");
  let assets = document.querySelectorAll(
    ".past-events-video-container > :nth-child(2) ~ *"
  );

  video.addEventListener("pause", () => {
    video.removeAttribute("controls");
    assets.forEach((asset) => {
      asset.style.display = "block";
    });
  });

  video.addEventListener("play", () => {
    video.setAttribute("controls", "");
    let assets = document.querySelectorAll(
      ".past-events-video-container > :nth-child(2) ~ *"
    );
    assets.forEach((asset) => {
      asset.style.display = "none";
    });
  });

  video.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      video.setAttribute("controls", ""); // Show controls in fullscreen
    }
  });

  // Alternative for some browsers (webkit, moz, ms prefixes)
  video.addEventListener("webkitfullscreenchange", () => {
    if (document.webkitFullscreenElement) {
      video.setAttribute("controls", "");
    }
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  initPastEventVideo();
});
