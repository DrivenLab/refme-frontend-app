import { useAuth } from "@/context/auth";
import CSearchInput from "@/components/inputs/CSearchInput";
import { useState } from "react";
import api from "@/queries/api";
import { useGetMembers } from "@/queries/users.query";

import { Image } from "expo-image";
import { SafeAreaView, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import { Box, Text, VStack, FlatList } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import MemberItem from "@/components/users/MemberItem";

export default function AsignRefereeScreen() {
  const [error, setError] = useState("");
  const [memberName, setMemberName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { members, isLoadingMembers } = useGetMembers();

  const handleAssignReferee = () => {
    setError("");
    console.log("Members", members);
  };
  const [memberList, setMemberList] = useState(members);
  const handleFilterMembers = (text: string) => {
    if (text) {
      let filteredMembers = members.filter((member) =>
        member?.user?.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setMemberList(filteredMembers);
    } else {
      setMemberList(members);
    }
  };

  return (
    <SafeAreaView>
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 100, width: "100%" }}
      />
      <VStack space="md">
        <VStack space="md" paddingHorizontal={24} mb={50}>
          {error && (
            <Box
              bg="$red200"
              paddingHorizontal={10}
              paddingVertical={5}
              borderRadius={5}
            >
              <Text>{error}</Text>
            </Box>
          )}
          <Box display="flex" flexDirection="row" gap={3}>
            <Text fontWeight="bold" fontSize={24} color="black" mt={15}>
              {i18n.t("assign_workout.who_do_test")}
            </Text>
          </Box>
          <CSearchInput
            value={memberName}
            placeholder={i18n.t("assign_workout.search_by_name")}
            onChangeText={(text) => {
              setMemberName(text);
              handleFilterMembers(text);
            }}
            error=""
            width="100%"
          />

          <FlatList
            height="$3/4"
            data={memberList}
            renderItem={({ item: member }) => (
              <MemberItem member={member} idMember={member.id} />
            )}
            keyExtractor={(item: any) => item.id}
          />
          <CBtn
            title={i18n.t("common.confirm_and_continue")}
            onPress={handleAssignReferee}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login_referee_img: {
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  refme_logo: {
    height: 30,
    width: "100%",
    marginVertical: 30,
  },
});
