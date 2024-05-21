import { User } from "@/types/user";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";
type Props = {
  user: User;
  idUser?: number;
};

const MemberItem = ({ member, idMember }: Props) => {
  /*const {
    downloadSession,
    downloadProgress,
    isDownloading,
    setIsDownloading,
    wasSessionDownloaded,
  } = useSession({ idSession: idSession });
  const idWorkout = workout.id;
*/
  return (
    <>
      <Pressable>
        <Box
          rounded={"$md"}
          px={"$5"}
          py={"$2"}
          mb={"$4"}
          style={styles.memberItem}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            style={{ borderBottomWidth: 2, borderBottomColor: "#ede18a" }}
            py={"$1"}
          >
            <Box>
              <Text>{i18n.t("dm")}</Text>
            </Box>
          </Box>
          <Box>
            <Text fontWeight="bold" color="black" fontSize={20} py={"$2"}>
              {member.fullName}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </>
  );
};

export default MemberItem;
const styles = StyleSheet.create({
  memberItem: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
