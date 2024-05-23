import { useState, useEffect } from "react";

type Props = {
  initialCountdown: number;
  onFinishCountdown?: () => void;
};
const useCountdown = ({ initialCountdown, onFinishCountdown }: Props) => {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          if (onFinishCountdown) onFinishCountdown();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
  return { countdown };
};

export default useCountdown;
