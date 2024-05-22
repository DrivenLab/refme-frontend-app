import { User } from "@/types/user";
import { StyleSheet } from "react-native";
import {
  Box,
  Pressable,
  Text,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";
type Props = {
  member: Member;
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
  const memberTypeMapping = {
    ["re"]: i18n.t("referee"),
    ["ra"]: i18n.t("assistant_referee"),
  };

  return (
    <>
      <Pressable>
        <Box rounded={"$md"} px={"$5"} style={styles.memberItem}>
          <Box
            flexDirection="row"
            alignItems="center"
            alignContent="center"
            py={"$2"}
          >
            <Box marginRight={20}>
              <Avatar size="m" marginHorizontal="auto">
                <AvatarFallbackText>R</AvatarFallbackText>

                <AvatarImage
                  source={
                    member.user?.profilePicture
                      ? { uri: member.user?.profilePicture }
                      : ""
                  }
                  alt="User Profile picture"
                />
              </Avatar>
            </Box>
            <Box
              flex={1}
              justifyContent="space-arround"
              alignItems="flex-start"
            >
              <Text fontWeight="bold" color="black" fontSize={16}>
                {member.user.fullName ? member.user.fullName : "--"}
              </Text>
              <Text color="black" fontSize={16}>
                {member.memberType
                  ? memberTypeMapping[member.memberType]
                  : "--"}
              </Text>
            </Box>
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
