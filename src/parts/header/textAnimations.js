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

const initializeHeightAnimation = (id, amount, duration, delay = 0) => {
  const translateYAnimation = KUTE.to(
    id,
    { height: amount },
    { duration: duration, easing: KUTE.Easing.easingQuadraticInOut, delay: delay}
  );
  return translateYAnimation;
};

const initializeSlideAnimation = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;

  const slideAnim = KUTE.fromTo(
    '#' + id,
    {translateX: -elementWidth, opacity: 0},
    {translateX: 0, opacity: 1},
    {duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticIn}
  )

  return slideAnim;
}

export {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
  initializeHeightAnimation,
  initializeSlideAnimation
};
