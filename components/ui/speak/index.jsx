import { IoPlayOutline } from "react-icons/io5";
import "./style.css";
import { useRef, useState } from "react";
import useAdjustTooltipPosition from "./useAdjustTooltipPosition";
import { useEffect } from "react";

const Speak = ({ text, tooltip }) => {
  const tooltipRef = useRef();
  const [showTooltip, setShowTooltip] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const englishLangRegex = new RegExp(/[a-z]/gi);

  const handleClick = async () => {
    setShowTooltip(false);
    setIsPlaying(true);
    setIsPlaying(false);
  };

  const tooltipProps = {
    className: "speak-btn__tooltip",
    ref: tooltipRef,
  };

  useAdjustTooltipPosition(tooltipRef);

  return (
    <button className={`speak-btn`} disabled={isPlaying} onClick={handleClick}>
      <IoPlayOutline className="speak-btn__icon" />
      {tooltip && showTooltip && (
        <div {...tooltipProps}>
          {typeof tooltip === "string" ? tooltip : "قم بتشغيلي"}
        </div>
      )}
    </button>
  );
};

export default Speak;
