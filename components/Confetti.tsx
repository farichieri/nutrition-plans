import React, { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const Confetti = () => {
  const refAnimationInstance: any = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.4 },
        particleCount: Math.floor(500 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 88,
      startVelocity: 55,
      ticks: 300,
      decay: 1,
    });

    makeShot(0.2, {
      spread: 60,
      ticks: 325,
      decay: 1,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      ticks: 350,
    });

    makeShot(0.1, {
      spread: 150,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      ticks: 400,
    });

    makeShot(0.1, {
      spread: 200,
      startVelocity: 45,
      ticks: 400,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, []);

  return (
    <>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default Confetti;
