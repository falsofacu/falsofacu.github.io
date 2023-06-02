import KUTE from "kute.js";

const initializeBgTextAnimation = (id, duration) => {
  const bgTextAnimation = KUTE.fromTo(
    id,
    { translate: [-500, 1000], rotate: -20  },
    { translate: [1000, -90], rotate: -20  },
    { repeat: 9999, duration: duration}
  );
  return bgTextAnimation;
};

export { initializeBgTextAnimation };
