import { useState, useEffect, useCallback, useRef } from "react";
import { useTimer } from "react-use-precision-timer";

type Props = {
  stopInSec: number;
  delay?: number;
};
const useCountdown = ({ stopInSec, delay = 1 }: Props) => {
  const [countdownInSec, setCountdownInSec] = useState(stopInSec);
  const hasFinished = useRef(false);
  const elapsedRunningTime = useRef(0);

  const callback = useCallback(() => {
    elapsedRunningTime.current = getElapsedRunningTime();
    const currentTime_ = Math.floor(getElapsedRunningTime() / 1000);
    setCountdownInSec((prev) => prev - 1);
    if (currentTime_ >= stopInSec) {
      hasFinished.current = true;
      stop();
    }
  }, []);
  // The callback will be called every 1000 milliseconds.
  const { getElapsedRunningTime, stop } = useTimer(
    { delay: delay * 1000, startImmediately: true },
    callback
  );

  return {
    countdownInSec,
    hasFinished,
    elapsedRunningTime,
  };
};

export default useCountdown;
