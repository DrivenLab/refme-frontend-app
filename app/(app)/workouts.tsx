import React, { useState } from "react";
import WorkoutList from "@/components/workouts/WorkoutList";
import { Box, Pressable, SafeAreaView, Text } from "@gluestack-ui/themed";
import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
const Workouts = () => {
  const [tab, setTab] = useState("pending");
  return (
    <SafeAreaView bg="$white" px={"$3"} flex={1}>
      <CTab
        currentTab={tab}
        changeCurrentTab={(tab_: string) => setTab(tab_)}
        tabs={[
          { label: i18n.t("workout_pending"), value: "pending" },
          { label: i18n.t("workout_finished"), value: "finished" },
        ]}
      />

      <WorkoutList />
    </SafeAreaView>
  );
};

export default Workouts;
