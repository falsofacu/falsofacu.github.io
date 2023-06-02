import KUTE from "kute.js";

const initializeFadeInAnimation = (id, duration, delay = 0) => {
  const fadeInAnimation = KUTE.to(
    id,
    { opacity: 1 },
    { duration: duration, delay: delay }
  );

  return fadeInAnimation;
};

const initializeFadeOutAnimation = (id, duration, delay = 0) => {
  const fadeOutAnimation = KUTE.to(
    id,
    { opacity: 0 },
    { duration: duration, delay: delay }
  );

  return fadeOutAnimation;
};

const initializeHeightAnimation = (id, amount, duration) => {
  const translateYAnimation = KUTE.to(
    id,
    { height: amount },
    { duration: duration, easing: KUTE.Easing.easingQuadraticOut, delay: 1500}
  );
  return translateYAnimation;
};

export {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
  initializeHeightAnimation,
};
