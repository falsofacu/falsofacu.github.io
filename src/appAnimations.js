import KUTE from "kute.js";

const initializeBgTextAnimation = (id, duration) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnimation = KUTE.fromTo(
    "#" + id,
    { translateX: 0 },
    { translateX: -elementWidth },
    { repeat: Infinity, duration: duration, easing: "linear" }
  );
  return bgTextAnimation;
};

export { initializeBgTextAnimation };
