import React, { useState } from "react";
import { Box, Button, ButtonIcon } from "@gluestack-ui/themed";

import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
import { AddIcon } from "@gluestack-ui/themed";
import { useGetSessions } from "@/queries/session.query";
import SessionList from "@/components/session/SessionList";

const MemberWorkouts = () => {
  const [tab, setTab] = useState<"pending" | "finished">("pending");
  const { sessions } = useGetSessions();

  return (
    <>
      <Box flexDirection="row" justifyContent="center">
        <Button
          width={60}
          rounded="$full"
          height={60}
          bg="$primary"
          borderColor="indigo600"
          position="absolute"
          top={-30}
          hardShadow="3"
        >
          <ButtonIcon color="white" as={AddIcon} />
        </Button>
      </Box>
      <CTab
        currentTab={tab}
        changeCurrentTab={(tab_: string) =>
          setTab(tab_ as "pending" | "finished")
        }
        tabs={[
          { label: i18n.t("workout_pending"), value: "pending" },
          { label: i18n.t("workout_finished"), value: "finished" },
        ]}
      />
      <SessionList sessions={sessions} state={tab} />
    </>
  );
};

export default MemberWorkouts;
