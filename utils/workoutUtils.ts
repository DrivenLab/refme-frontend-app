import {
  ITERATION_TOTAL_TIME,
  TIME_TO_ANSWER,
  VIDEO_TIME_IN_SECONDS,
} from "@/constants/Session";
import { Iteration } from "@/types/session";
import { MEMBER_TYPE, WORKOUT_TYPE } from "@/types/workout";

export const calculateNextTimeToGetReady = (props: {
  i?: Iteration;
  type: WORKOUT_TYPE;
  memberType: MEMBER_TYPE;
  breakDuration: number;
}) => {
  if (!props.i) return 3;
  if (props.i.answers.length === 0) {
    return (
      props.breakDuration +
      VIDEO_TIME_IN_SECONDS[props.memberType][props.type] +
      TIME_TO_ANSWER[props.memberType][props.type] -
      ITERATION_TOTAL_TIME[props.memberType][props.type]
    );
  }
  return (
    props.breakDuration - ITERATION_TOTAL_TIME[props.memberType][props.type]
  );
};
