import { useState, useEffect } from "react";

export const useSmartPosition = (targetRef: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
  });

  const updatePosition = () => {
    const target = targetRef.current;

    if (target) {
      const targetRect = target.getBoundingClientRect();
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const targetTop = targetRect.top;
      const targetLeft = targetRect.left;

      // Get the window size
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let top = "auto";
      let right = "auto";
      let bottom = "auto";
      let left = "auto";

      if (targetTop + targetHeight + 300 < windowHeight) {
        top = `${targetHeight + 10}px`;
      } else {
        bottom = `${targetHeight + 10}px`;
      }

      if (targetLeft + targetWidth < windowWidth) {
        left = `0px`;
      } else {
        right = `0px`;
      }

      setPosition({ top, left, bottom, right });
    }
  };

  useEffect(() => {
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [targetRef.current]);

  return position;
};
