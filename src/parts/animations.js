import KUTE from "kute.js";

const initializePulseAnimation = (id, duration = 150) => {
  const pulseAnim = KUTE.fromTo(
    "#" + id,
    { transform: { scale: 1 } },
    { transform: { scale: 1.2 } },
    {
      repeat: 3,
      duration: duration,
      yoyo: true,
      easing: KUTE.Easing.easingCircularIn,
    }
  );

  return pulseAnim;
};

const initializeZoomAnimation = (
  id,
  duration = 1200,
  initialScale = 0.01,
  targetScale = 10,
  delay = 0
) => {
  const zoomAnim = KUTE.fromTo(
    "#" + id,
    { transform: { scale: initialScale } },
    { transform: { scale: targetScale } },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingCircularIn }
  );
  return zoomAnim;
};

const initializeTweenAnimation = (id, id2, duration = 400, repeat = 2) => {
  const tweenAnim = KUTE.fromTo(
    "#" + id,
    { path: "#" + id },
    { path: "#" + id2 },
    { duration: duration, repeat: repeat, yoyo: true }
  );
  return tweenAnim;
};

//TODO: Implement this?
const initializeLoadAnimation = (id, duration, delay = 0) => {
  const loadAnim = KUTE.fromTo(
    "#" + id,
    {},
    {},
    { duration: duration, delay: delay, easing: "linear", repeat: Infinity }
  );

  return loadAnim;
};

const initializeFadeInAnimation = (id, duration, delay = 0) => {
  const fadeInAnim = KUTE.to(
    "#" + id,
    { opacity: 1 },
    { duration: duration, delay: delay }
  );

  return fadeInAnim;
};

const initializeFadeOutAnimation = (id, duration, delay = 0) => {
  const fadeOutAnim = KUTE.to(
    "#" + id,
    { opacity: 0 },
    { duration: duration, delay: delay }
  );

  return fadeOutAnim;
};

const initializeHeightAnimation = (id, amount, duration, delay = 0) => {
  const translateYAnim = KUTE.to(
    "#" + id,
    { height: amount },
    {
      duration: duration,
      easing: KUTE.Easing.easingQuadraticInOut,
      delay: delay,
    }
  );
  return translateYAnim;
};

const initializeSlideAnimation = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;

  const slideAnim = KUTE.fromTo(
    "#" + id,
    { translateX: -elementWidth, opacity: 0 },
    { translateX: 0, opacity: 1 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticIn }
  );

  return slideAnim;
};

const initializeTextScroll = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnim = KUTE.fromTo(
    "#" + id,
    { translateX: 0 },
    { translateX: -elementWidth },
    { repeat: Infinity, duration: duration, delay: delay }
  );
  return bgTextAnim;
};

const initializeTextScrollBackwards = (id, duration, delay = 1000) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnim = KUTE.fromTo(
    "#" + id,
    { translateX: -elementWidth },
    { translateX: 0 },
    { repeat: Infinity, duration: duration, delay: delay }
  );
  return bgTextAnim;
};

const initializeStartScroll = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    { translateY: -elementHeight, rotate: -22.5 },
    { translateY: -elementHeight / 4, rotate: -22.5 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut }
  );
  return startScrollAnim;
};

const initializeStartScrollBackwards = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    { translateY: elementHeight, rotate: -22.5 },
    { translateY: -elementHeight / 4, rotate: -22.5 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut }
  );
  return startScrollAnim;
};

export {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
  initializeHeightAnimation,
  initializeSlideAnimation,
  initializePulseAnimation,
  initializeTweenAnimation,
  initializeZoomAnimation,
  initializeLoadAnimation,
  initializeTextScroll,
  initializeTextScrollBackwards,
  initializeStartScroll,
  initializeStartScrollBackwards,
};
