import { useState, useEffect, useCallback, useRef } from "react";
import { useTimer } from "react-use-precision-timer";

type Props = {
  finishTime: number;
  onFinishCountdown?: () => void;
  delay?: number;
};
const useCountdown = ({ finishTime, onFinishCountdown, delay = 1 }: Props) => {
  const [currentTime, setCurrentTime] = useState(finishTime);
  const callback = useCallback(() => {
    const currentTime_ = Math.floor(getElapsedRunningTime() / 1000);
    setCurrentTime((prev) => prev - 1);
    if (currentTime_ >= finishTime) {
      console.log("stop");
      stop();
      if (onFinishCountdown) onFinishCountdown();
    }
  }, []);
  // The callback will be called every 1000 milliseconds.
  const { getElapsedRunningTime, stop, getPauseTime } = useTimer(
    { delay: delay * 1000, startImmediately: true },
    callback
  );

  return {
    currentTime,
    getPauseTime,
  };
};

export default useCountdown;
