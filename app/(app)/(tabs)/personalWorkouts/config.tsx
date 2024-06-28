import {
  PersonalWorkout,
  PersonalWorkoutAbility,
  PersonalWorkoutConfig,
} from "@/types/personalWorkouts";
import {
  Text,
  ScrollView,
  VStack,
  Button,
  ButtonText,
  Box,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import i18n from "@/languages/i18n";
import { useMemo, useState } from "react";
import CInputSelect from "@/components/inputs/CInputSelect";
import {
  LEVEL_INPUT_SELECT_OPTIONS,
  WORKOUT_TYPE_INPUT_SELECT_OPTIONS,
} from "@/constants/PersonalWorkouts";
import { useGetPersonalWorkoutsConfig } from "@/queries/personalWorkouts.query";
import api from "@/queries/api";
import { useAuth } from "@/context/auth";
import { CreateWorkout, WORKOUT_TYPE } from "@/types/workout";
import { Session } from "@/types/session";
import DownloadSessionModal from "@/components/personal-workouts/DonwloadSessionModal";
import { ViewInstructionsModal } from "@/components/ViewInstructionsModal";
import WorkoutConfigutationList from "@/components/workouts/WorkoutConfigutationList";
import useToast from "@/hooks/useToast";
import VideoImageTutorial from "@/components/personal-workouts/VideoImageTutorial";

const Config = () => {
  /*STATES */
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<{
    level: string;
    workoutType: string;
  }>({ level: "", workoutType: "" });
  const [session, setSession] = useState<Session>();
  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false);
  /**HOOKS */
  const {
    ability = "agilidad",
    distance = "",
    name = "",
  } = useLocalSearchParams<{
    ability: PersonalWorkoutAbility;
    distance: string;
    name: string;
  }>();
  const { personalWorkoutsConfig } = useGetPersonalWorkoutsConfig();
  const { currentOrganization, profile } = useAuth();

  const generalWorkoutInfo = useMemo(() => {
    if (form.level)
      return (
        personalWorkoutsConfig[ability][distance][name].find(
          (w) => w.level === form.level
        ) ?? ({} as PersonalWorkout)
      );
    else return personalWorkoutsConfig[ability][distance][name][0];
  }, [form.level]);

  const isDisabled = useMemo(() => {
    return Boolean(!form.level.length || !form.workoutType.length);
  }, [form]);
  const { showToast } = useToast();
  /*FUNCTIONS */

  /*CREATE WORKOUT */
  const createWorkout = async (w: CreateWorkout) => {
    setIsLoading(true);
    try {
      const { data } = await api.post<Session>(
        `organizations/${currentOrganization?.id}/workouts/`,
        w
      );
      setSession(data);
    } catch (error) {
      showToast({
        title: i18n.t("general_error"),
        description: error as string,
        action: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /*CREATE WORKOUT AND THEN DOWNLOAD SESSION  */
  const handleOnPress = async () => {
    //Get current workoutdata base on ability, distance, name and level
    const workoutData = personalWorkoutsConfig[ability][distance][name].find(
      (w) => w.level === form.level
    );
    if (!workoutData) return;
    const w: CreateWorkout = {
      name: workoutData.name,
      description: workoutData.description,
      breakDuration: workoutData.breakDuration,
      excerciseDuration: workoutData.excerciseDuration,
      material: workoutData.material,
      type: form.workoutType,
      memberType: profile ? profile[0].memberType : "",
      numberOfDecisions: workoutData.numberOfDecisions,
      numberOfRepetitions: workoutData.numberOfRepetitions,
      usageType: "personal",
    };
    await createWorkout(w);
  };

  return (
    <>
      {session && <DownloadSessionModal idSession={session.id} />}

      <ViewInstructionsModal
        modalIsOpen={instructionsModalIsOpen}
        onClose={() => setInstructionsModalIsOpen((prev) => !prev)}
        workoutType={(form.workoutType as WORKOUT_TYPE) || "dm"}
      />
      <ScrollView backgroundColor="white">
        <VideoImageTutorial
          imgTutorial={generalWorkoutInfo?.imgTutorial}
          imgVideoMiniature={generalWorkoutInfo?.imgVideoMiniature}
          videoTutorial={generalWorkoutInfo?.videoTutorial}
        />
        <VStack px={"$3"} pt={"$2"} space="md">
          {/* TUTORIAL */}
          <>
            <Text color="#091233" fontWeight={"$bold"} fontSize={"$lg"}>
              {i18n.t("personal_workout_flow.config.tutorial")}
            </Text>
            <Text color="#091233" fontWeight={400}>
              {distance === "caminadora" && !form.level
                ? "-"
                : generalWorkoutInfo?.description}
            </Text>
          </>
          {/* MATERIALS */}
          <>
            <Text color="#091233" fontWeight={"$bold"} fontSize={"$lg"}>
              {i18n.t("personal_workout_flow.config.materials")}
            </Text>
            <VStack flexDirection="row" space="sm">
              {generalWorkoutInfo?.material.map((m) => (
                <Text color="#091233" fontWeight={400} key={m}>
                  {m}
                </Text>
              ))}
            </VStack>
          </>
          {/*INPUTS SELECTS */}
          <>
            <CInputSelect
              initialValue={form.level}
              placeholder={i18n.t(
                "personal_workout_flow.config.difficulty_level"
              )}
              options={LEVEL_INPUT_SELECT_OPTIONS}
              onChangeValue={(v: string | number) =>
                setForm((prev) => ({ ...prev, level: v + "" }))
              }
              error=""
              secureTextEntry={false}
              width="100%"
              required
            />
            <VStack flexDirection="row" space="sm" alignItems="center">
              <Box flex={1}>
                <CInputSelect
                  initialValue={form.workoutType}
                  placeholder={i18n.t(
                    "personal_workout_flow.config.cognitive_ability"
                  )}
                  options={generalWorkoutInfo?.cognitiveAbility.map((h) => ({
                    label: i18n.t(h),
                    value: h,
                  }))}
                  onChangeValue={(v: string | number) =>
                    setForm((prev) => ({ ...prev, workoutType: v + "" }))
                  }
                  width="100%"
                  required
                  isDisabled={!form.level.length}
                />
              </Box>
              <Button
                variant="link"
                onPress={() => setInstructionsModalIsOpen(true)}
                disabled={form.workoutType.length === 0}
                opacity={form.workoutType.length ? 1 : 0.8}
              >
                <ButtonText fontWeight="medium" color="black" underline>
                  {i18n.t("workout_flow.watch_tutorial_label")}
                </ButtonText>
              </Button>
            </VStack>
          </>
          {/*CONFIGURATIONS */}
          <>
            <WorkoutConfigutationList
              workout={form.level ? generalWorkoutInfo : undefined}
            />
          </>

          <Button
            mt={"$6"}
            bg="$primary"
            rounded="$full"
            height={50}
            mb={20}
            disabled={isDisabled}
            opacity={isDisabled ? 0.5 : 1}
            onPress={handleOnPress}
          >
            {isLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText disabled color="black" fontWeight="medium">
                {i18n.t("prepare")}
              </ButtonText>
            )}
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Config;
