import { useAuth } from "@/context/auth";
import CSearchInput from "@/components/inputs/CSearchInput";
import { useState } from "react";
import api from "@/queries/api";
import { useGetMembers } from "@/queries/users.query";

import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import CBtn from "@/components/CBtn";
import {
  SafeAreaView,
  Text,
  Box,
  VStack,
  Divider,
  Button,
  ButtonText,
  ScrollView,
  ImageBackground,
  FlatList,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";

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
      <ImageBackground
        source={require("@/assets/images/workout_banner.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient // Background Linear Gradient
          colors={["#090B22", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.backgroundLinearGradient}
        >
          <Text color="white" px="$3" fontSize="$lg" bold>
            {i18n.t("create_workout.assign_workout")}
          </Text>
        </LinearGradient>
      </ImageBackground>
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
  backgroundLinearGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backgroundImage: {
    height: 80,
    width: "100%",
    // flex: 1,
    overflow: "hidden",
  },
});
