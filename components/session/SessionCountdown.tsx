import React, { useEffect, useState } from "react";
import TextInformation from "../workouts/TextInformation";
import IterationTextImageCountdown from "./IterationTextImageCountdown";
import IterationTextImage from "./IterationTextImage";
import { IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { TEXT_TYPES } from "@/types/workout";

type Props = {
  onFinishCountdown: () => void;
  initialCountdown: number;
  imageName: IMAGE_NAME;
  iterationNumber: number;
  totalItaration: number;
  type: TEXT_TYPES;
  recognitionType?: RECOGNITION_VIDEO_TYPE;
};
const SessionCountdown = ({
  onFinishCountdown,
  initialCountdown,
  imageName,
  iterationNumber,
  totalItaration,
  type,
  recognitionType,
}: Props) => {
  const [count, setCount] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          onFinishCountdown();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

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
