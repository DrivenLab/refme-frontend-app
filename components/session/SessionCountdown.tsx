import React, { useEffect, useState } from "react";
import TextInformation from "../workouts/TextInformation";
import IterationTextImageCountdown from "./IterationTextImageCountdown";
import IterationTextImage from "./IterationTextImage";
import { IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { TEXT_TYPES } from "@/types/workout";
import { useWhistleContext } from "@/hooks/useWhistle";

type Props = {
  initialCountdown: number;
  imageName: IMAGE_NAME;
  iterationNumber: number;
  totalItaration: number;
  type: TEXT_TYPES;
  recognitionType?: RECOGNITION_VIDEO_TYPE;
  onFinishCountdown: () => void;
};
const SessionCountdown = ({
  initialCountdown,
  imageName,
  iterationNumber,
  totalItaration,
  type,
  recognitionType,
  onFinishCountdown,
}: Props) => {
  const { playShortSound, playLongSound } = useWhistleContext();
  const [count, setCount] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          onFinishCountdown();
          return 0;
        }
        const res = prevCount - 1;
        if ([4, 3, 2].includes(prevCount)) {
          playShortSound();
        }
        if (prevCount === 1) {
          playLongSound();
        }
        return res;
      });
    }, 1000);
    if (count === 3) {
      playShortSound();
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
  return (
    <>
      {count >= 1 ? (
        <IterationTextImageCountdown
          count={count}
          imageName={imageName}
          textStep={1}
          textType={type}
          initialCountdown={initialCountdown}
          iterationNumber={iterationNumber}
          totalItaration={totalItaration}
          recognitionType={recognitionType}
        />
      ) : (
        <IterationTextImage imageName={imageName}>
          <TextInformation
            type={type}
            step={1}
            recognitionType={recognitionType}
          />
        </IterationTextImage>
      )}
    </>
  );
};

export default SessionCountdown;
