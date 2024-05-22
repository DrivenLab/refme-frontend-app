import { Session } from "@/types/session";

export const getSessionOrderedByIterations = (session: Session) => {
  const iterations_ = session.workout.iterations.sort(
    (a, b) => a.repetitionNumber - b.repetitionNumber
  );
  session.workout.iterations = iterations_;
  return { ...session };
};

export const getEndVideoTime = () => {
  const now = new Date();

  // Step 2: Get the current time in milliseconds
  const nowInMilliseconds = now.getTime();

  // Step 3: Add 7000 milliseconds (7 seconds)
  const sevenSecondsLaterInMilliseconds = nowInMilliseconds + 7000;

  // Step 4: Create a new Date object using the updated timestamp
  const sevenSecondsLater = new Date(sevenSecondsLaterInMilliseconds);
  return sevenSecondsLater;
};
