import { Session } from "@/types/session";
import { Workout } from "@/types/workout";

export const getSessionOrderedByIterations = (session: Session) => {
  const iterations_ = session.workout.iterations.sort(
    (a, b) => a.repetitionNumber - b.repetitionNumber
  );
  session.workout.iterations = iterations_;
  return { ...session };
};

export const getIterationsOrdered = (workout: Workout) => {
  const iterations_ = workout.iterations.sort(
    (a, b) => a.repetitionNumber - b.repetitionNumber
  );
  return iterations_;
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
export function formatMilliseconds(milliseconds: number) {
  // Extract seconds and milliseconds
  const seconds = Math.floor(milliseconds / 1000);
  const ms = milliseconds % 1000;

  // Format the result as a string
  return `${seconds}:${ms.toString().padStart(3, "0")} ms`;
}
export function formatTimeDifference(date1: Date, date2: Date) {
  // Calculate the difference in milliseconds
  let diffMs = Math.abs(date1.getTime() - date2.getTime());

  // Convert milliseconds to total seconds
  let totalSeconds = Math.floor(diffMs / 1000);

  // Calculate minutes and seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // Format the time difference as a string
  return `${minutes}:${seconds.toString().padStart(2, "0")} s`;
}
export function formatDate(date: Date) {
  // Define an array of month abbreviations
  const months = [
    "Ene.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  // Extract the day, month, and year from the date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Extract the hours and minutes, and pad minutes with leading zero if necessary
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Construct the formatted string
  return `${day} ${month} ${year} - ${hours}:${minutes} hs`;
}
