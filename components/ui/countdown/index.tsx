import { useState, useEffect, useRef } from "react";
import { CountDownProps } from "./types";
import { convertMsToTime } from "../../../utils";
import { IoPlay, IoStop } from "react-icons/io5";
import { BiReplyAll } from "react-icons/bi";
import { useKey } from "@/hooks";

const CountDown = (props: CountDownProps) => {
  const {
    reset,
    controls,
    stop,
    className,
    value,
    onStop,
    onResume,
    onChange,
    onFinish,
  } = props || {};
  const counterIntervalRef = useRef<number>(null);
  const [time, setTime] = useState(value);
  const [stopCounter, setStopCounter] = useState(stop);

  useEffect(() => {
    if (reset || value !== time) setTime(value);
  }, [value, reset]);

  useEffect(() => setStopCounter(stop), [stop]);

  useEffect(() => {
    if (stopCounter && onStop) onStop();
    else if (!stopCounter && onResume) onResume();
  }, [stopCounter, onResume, onStop]);

  useEffect(() => {
    if (!value) return;

    counterIntervalRef.current = setInterval(handleChange, 1000);

    if (time <= 0) {
      if (onChange) onChange(time);
      if (onFinish) onFinish();
      return clearInterval(counterIntervalRef.current as number);
    }

    return () => clearInterval(counterIntervalRef.current as number);
  }, [time, stopCounter, onFinish]);

  const handleChange = () => {
    if (stopCounter) return clearInterval(counterIntervalRef.current as number);
    setTime((prev: number) => prev - 1000);
    if (onChange) onChange(time);
  };

  const handlePlayCounter = () => setStopCounter(false);
  const handleStopCounter = () => setStopCounter(true);
  const handleResetCounter = () => {
    if (onChange) onChange(value);
    setTime(value);
  };

  useKey(["p"], handleStopCounter);
  useKey(["p"], handlePlayCounter);
  useKey(["r"], handleResetCounter);

  return (
    <section>
      <p className={className}>{convertMsToTime(time)}</p>
      {controls && (
        <section className="flex justify-center">
          {stopCounter ? (
            <IoPlay
              className="question__time-control-btn"
              onClick={handlePlayCounter}
            />
          ) : (
            <IoStop
              className="question__time-control-btn"
              onClick={handleStopCounter}
            />
          )}

          <BiReplyAll
            className="question__time-control-btn"
            onClick={handleResetCounter}
          />
        </section>
      )}
    </section>
  );
};

export default CountDown;
