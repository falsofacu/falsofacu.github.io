import KUTE, { Easing } from "kute.js";

const initializeTextScroll = (id, duration, delay = 0) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnimation = KUTE.fromTo(
    "#" + id,
    { translateX: 0 },
    { translateX: -elementWidth },
    { repeat: Infinity, duration: duration, delay: delay}
  );
  return bgTextAnimation;
};

const initializeTextScrollBackwards = (id, duration, delay = 1000) => {
  const elementWidth = document.getElementById(id).offsetWidth;
  const bgTextAnimation = KUTE.fromTo(
    "#" + id,
    { translateX: -elementWidth},
    { translateX: 0 },
    { repeat: Infinity, duration: duration, delay: delay}
  );
  return bgTextAnimation;
};

const initializeStartScroll = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    {translateY: -elementHeight, rotate: -22.5},
    {translateY: (-elementHeight / 4), rotate: -22.5},
    {duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut}
  )
  return startScrollAnim;
}

const initializeStartScrollBackwards = (id, duration, delay = 0) => {
  const elementHeight = document.getElementById(id).offsetHeight;
  const startScrollAnim = KUTE.fromTo(
    "#" + id,
    {translateY: elementHeight, rotate: -22.5},
    {translateY: (-elementHeight / 4), rotate: -22.5},
    {duration: duration, delay: delay, easing: KUTE.Easing.easingQuadraticOut}
  )
  return startScrollAnim;
}
export { initializeTextScroll, initializeTextScrollBackwards, initializeStartScroll, initializeStartScrollBackwards};
