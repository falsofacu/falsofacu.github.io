import KUTE from "kute.js";

const initializeFadeInAnimation = (id, duration) => {
    const fadeInAnimation = KUTE.fromTo(
      id,
      { opacity: 0 },
      { opacity: 1 },
      { duration: duration }
    );

  return fadeInAnimation;
};
const initializeFadeOutAnimation = (id, duration) => {
    const fadeOutAnimation = KUTE.fromTo(
      id,
      { opacity: 1 },
      { opacity: 0 },
      { duration: duration }
    );

  return fadeOutAnimation;
};

export { initializeFadeInAnimation, initializeFadeOutAnimation };
