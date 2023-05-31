import KUTE from "kute.js";

const initializeBtnAnimations = () => {
  const btnPulse = KUTE.fromTo(
    "#btn-wrap",
    { transform: { scale: 1 } },
    { transform: { scale: 1.2 } },
    {
      repeat: 3,
      duration: 150,
      yoyo: true,
      easing: KUTE.Easing.easingCircularIn,
    }
  );

  return btnPulse;
};

const initializeBlobAnimations = () => {
  const blob1Zoom = KUTE.fromTo(
    "#blob1",
    { transform: { scale: 0.01 } },
    { transform: { scale: 10 } },
    { duration: 1200, easing: KUTE.Easing.easingCircularIn }
  );
  const blob1Tween = KUTE.fromTo(
    "#blob1-1",
    { path: "#blob1-1" },
    { path: "#blob1-2" },
    { repeat: 2, duration: 400, yoyo: true }
  );
  const blob2Zoom = KUTE.fromTo(
    "#blob2",
    { transform: { scale: 0.01 } },
    { transform: { scale: 10 } },
    { duration: 1200, easing: KUTE.Easing.easingCircularIn }
  );
  const blob2Tween = KUTE.fromTo(
    "#blob2-1",
    { path: "#blob2-1" },
    { path: "#blob2-2" },
    { repeat: 2, duration: 400, yoyo: true }
  );
  return [blob1Tween, blob1Zoom, blob2Tween, blob2Zoom];
};

const initializeStartAnimations = () => {
  const startBlobTween = KUTE.fromTo(
    "#start-blob-1",
    { path: "#start-blob-1" },
    { path: "#start-blob-2" },
    { repeat: 10, duration: 1000, yoyo: true }
  );

  const startBlobZoom = KUTE.fromTo(
    "#start-blob",
    { transform: { scale: 0.001 } },
    { transform: { scale: 10 } },
    { duration: 1200, easing: KUTE.Easing.easingExponentialIn, delay: 300 }
  );

  return [startBlobTween, startBlobZoom];
};

export {
  initializeBtnAnimations,
  initializeBlobAnimations,
  initializeStartAnimations
};
