import KUTE from "kute.js";

const initializeTextScroll = (id, duration) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnimation = KUTE.fromTo(
    "#" + id,
    { translateX: 0 },
    { translateX: -elementWidth },
    { repeat: Infinity, duration: duration}
  );
  return bgTextAnimation;
};

export { initializeTextScroll };
