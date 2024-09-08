import { useEffect } from "react";

const useAdjustTooltipPosition = (tooltipRef) => {
  useEffect(() => {
    if (!tooltipRef.current) return;

    const { left } = tooltipRef.current.getBoundingClientRect();

    if (left < 0) {
      const { height } =
        tooltipRef.current.parentElement.getBoundingClientRect();
      tooltipRef.current.style.left = "50%";
      tooltipRef.current.style.top = `${height + 12}px`;
      tooltipRef.current.style.transform = `translate(-50%, 0)`;
      tooltipRef.current.style.animationName = `speakBtnPlayMeVertical`;
    }
  }, [tooltipRef.current]);
};

export default useAdjustTooltipPosition;
