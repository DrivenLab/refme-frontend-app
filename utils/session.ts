import { Session, SessionContext } from "@/types/session";

export const getSessionOrderedByIterations = (session: Session) => {
  const iterations_ = session.workout.iterations.sort(
    (a, b) => a.repetitionNumber - b.repetitionNumber
  );
  session.workout.iterations = iterations_;
  return { ...session };
};

export const getEndVideoTime = ({
  timeInMilliseconds,
}: {
  timeInMilliseconds: number;
}) => {
  const now = new Date();

  // Step 2: Get the current time in milliseconds
  const nowInMilliseconds = now.getTime();

  // Step 3: Add 7000 milliseconds (7 seconds)
  const sevenSecondsLaterInMilliseconds =
    nowInMilliseconds + timeInMilliseconds;

  // Step 4: Create a new Date object using the updated timestamp
  const sevenSecondsLater = new Date(sevenSecondsLaterInMilliseconds);
  return sevenSecondsLater;
};

export const getDifferenceDate = (date1: Date, date2: Date) => {
  // Get the timestamps in milliseconds
  const timestamp1 = date1.getTime();
  const timestamp2 = date2.getTime();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = timestamp2 - timestamp1;

  // Create a new Date object for the difference
  const differenceDate = new Date(differenceInMilliseconds);
  return differenceDate;
};
export const getSessionResume = (s: SessionContext) => {
  console.log("session resume", s);
  const iterationWithVideos = s.iterations.filter((i) => i.video);
  const correctAnswers = iterationWithVideos.filter((i) => {
    //Si al usuario le faltó responder algunas de las 2 preguntas, ya se pone como incorrecta.
    if (!i.answer1 || !i.answer2) return false;
    return i.answer1 == i.userAnswer1 && i.answer2 == i.userAnswer2;
  }).length;
  //Manejo de Promedio
  let answerTotalTime = 0;
  for (const i of iterationWithVideos) {
    answerTotalTime += i.answeredInMs;
  }
  return {
    correctAnswers,
    wrongAnswers: Math.abs(iterationWithVideos.length - correctAnswers),
    answerAverageTime: answerTotalTime / iterationWithVideos.length,
    answerTotalTime,
  };
};
