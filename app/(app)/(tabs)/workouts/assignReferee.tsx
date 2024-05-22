import { useAuth } from "@/context/auth";
import CTextInput from "@/components/inputs/CTextInput";
import CNumericInput from "@/components/inputs/CNumericInput";
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
  const { signOut, user, profile, currentOrganization } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { members, isLoadingMembers } = useGetMembers();

  const handleAssignReferee = () => {
    setError("");
    console.log("Members", members);
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
          <FlatList
            data={members}
            mb={300}
            renderItem={({ item: member }) => (
              <MemberItem member={member} idMember={member.id} />
            )}
            keyExtractor={(item: any) => item.id}
          />
          <CBtn
            title={i18n.t("prepare")}
            onPress={handleAssignReferee}
            mt={30}
            mb={300}
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
