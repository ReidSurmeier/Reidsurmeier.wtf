"use client";

import { useEffect } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    const SIZE = 32;
    const FPS = 10;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const video = document.createElement("video");
    video.src = "/favicon-anim.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.preload = "auto";
    video.style.position = "fixed";
    video.style.top = "-9999px";
    video.style.width = "1px";
    video.style.height = "1px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    document.body.appendChild(video);

    // Remove any existing favicon links
    document.querySelectorAll("link[rel='icon']").forEach((el) => el.remove());

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const drawFrame = () => {
      if (video.readyState < 2) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(video, 0, 0, SIZE, SIZE);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        // Firefox requires removing and re-adding the link element to update
        const old = document.querySelector("link[rel='icon']");
        if (old) old.remove();
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        link.href = dataUrl;
        document.head.appendChild(link);
      } catch {
        // ignore tainted canvas errors
      }
    };

    const startLoop = () => {
      if (intervalId) return;
      intervalId = setInterval(drawFrame, 1000 / FPS);
    };

    video.addEventListener("playing", startLoop);

    const tryPlay = () => {
      video.play().catch(() => {
        const interact = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", interact);
          document.removeEventListener("keydown", interact);
          document.removeEventListener("touchstart", interact);
        };
        document.addEventListener("click", interact, { once: true });
        document.addEventListener("keydown", interact, { once: true });
        document.addEventListener("touchstart", interact, { once: true });
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      video.pause();
      video.remove();
    };
  }, []);

  return null;
}
