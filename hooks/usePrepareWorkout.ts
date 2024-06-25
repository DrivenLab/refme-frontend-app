import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";
import { useDMWorkout } from "@/context/DmContext";
import { useMemoryWorkout } from "@/context/MemoryContext";
import { useRecognitionWorkout } from "@/context/RecognitionContext";
import { WORKOUT_TYPE, Workout } from "@/types/workout";
import { useRouter } from "expo-router";

const ROUTE_TO = {
  dm: "/workouts/startWorkoutDM",
  memory: "/workouts/startWorkoutMemory",
  dmar: "/workouts/startWorkoutDM",
  "dm+memory": "/workouts/startWorkoutDMAndMem",
  recognition: "/workouts/startWorkoutRecognition",
};

const usePrepareWorkout = () => {
  const router = useRouter();

  const { prepareWorkout: prepareDM } = useDMWorkout();
  const { prepareWorkout: prepareDMAndMem } = useDMAndMemWorkout();
  const { prepareWorkout: prepareWorkoutMemory } = useMemoryWorkout();
  const { prepareWorkout: prepareWorkoutRecognition } = useRecognitionWorkout();

  const prepareWorkout = (workout: Workout) => {
    if (["dm", "dmar"].includes(workout.type)) {
      prepareDM(workout);
    } else if (workout.type === "memory") {
      prepareWorkoutMemory(workout);
    } else if (workout.type === "recognition") {
      prepareWorkoutRecognition(workout);
    } else if (workout.type === "dm+memory") {
      prepareDMAndMem(workout);
    }
  };
  const goToWorkout = (type: WORKOUT_TYPE) => {
    router.replace(ROUTE_TO[type as keyof typeof ROUTE_TO]);
  };
  return { prepareWorkout, goToWorkout };
};

export default usePrepareWorkout;
