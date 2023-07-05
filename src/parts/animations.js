import KUTE from "kute.js";

const initializePulseAnim = (id, duration = 150) => {
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

const initializeZoomAnim = (
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

const initializeFadeInAnim = (id, duration, delay = 0) => {
  const fadeInAnim = KUTE.to(
    "#" + id,
    { opacity: 1 },
    { duration: duration, delay: delay }
  );

  return fadeInAnim;
};

const initializeFadeOutAnim = (id, duration, delay = 0) => {
  const fadeOutAnim = KUTE.to(
    "#" + id,
    { opacity: 0 },
    { duration: duration, delay: delay }
  );

  return fadeOutAnim;
};

const initializeHeightAnim = (id, amount, duration, delay = 0) => {
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

const initializeSlideAnim = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;

  const slideAnim = KUTE.fromTo(
    "#" + id,
    { translateX: -elementWidth, opacity: 0 },
    { translateX: 0, opacity: 1 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticIn }
  );

  return slideAnim;
};

const initializeTextScrollAnim = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnim = KUTE.fromTo(
    "#" + id,
    { translateX: 0 },
    { translateX: -elementWidth },
    { duration: duration, repeat: Infinity,  delay: delay}
  );
  return bgTextAnim;
};

const initializeTextScrollAnimBackwards = (id, duration, delay = 1000) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnim = KUTE.fromTo(
    "#" + id,
    { translateX: -elementWidth },
    { translateX: 0 },
    { repeat: Infinity, duration: duration, delay: delay }
  );
  return bgTextAnim;
};

const initializeStartScrollAnim = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    { translateY: -elementHeight, rotate: -22.5 },
    { translateY: -elementHeight / 4, rotate: -22.5 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut }
  );
  return startScrollAnim;
};

const initializeStartScrollAnimBackwards = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    { translateY: elementHeight, rotate: -22.5 },
    { translateY: -elementHeight / 4, rotate: -22.5 },
    { duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut }
  );
  return startScrollAnim;
};

const initializeTranslateYAnim = (id, duration, distance = 0, delay = 0) => {
  if(distance === 0){
    distance = document.getElementById(id).offsetHeight;
  }
  const translateYAnim = KUTE.fromTo(
    "#" + id,
    {translateY: distance},
    {translateY: 0},
    {duration: duration, delay: delay}
  )
  return translateYAnim;
}

const initializeDimensionAnim = (id, duration, [targetHeight, targetWidth], delay = 0) => {
  const dimensionAnim = KUTE.to(
    "#" + id,
    {height: targetHeight, width: targetWidth},
    {duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut }
  )
  return dimensionAnim;
}

export {
  initializeFadeInAnim,
  initializeFadeOutAnim,
  initializeHeightAnim,
  initializeSlideAnim,
  initializePulseAnim,
  initializeZoomAnim,
  initializeTextScrollAnim,
  initializeTextScrollAnimBackwards,
  initializeStartScrollAnim,
  initializeStartScrollAnimBackwards,
  initializeTranslateYAnim,
  initializeDimensionAnim
};
