import { useAuth } from "@/context/auth";
import CSearchInput from "@/components/inputs/CSearchInput";
import { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import MemberList from "@/components/users/MemberList";
import { useGetWorkoutById } from "@/queries/workouts.query";

export default function AsignRefereeScreen() {
  const [error, setError] = useState("");
  const [memberName, setMemberName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: idWorkout } = useLocalSearchParams();
  const { workout, isLoadingWorkout } = useGetWorkoutById({
    idWorkout: Number(idWorkout),
  });

  const { members, isLoadingMembers } = useGetMembers({
    memberType: workout?.memberType,
  });
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    setMemberList(members);
  }, [isLoadingMembers]);

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

  if (isLoadingWorkout || isLoadingMembers) {
    return (
      //TODO mejorar vista de espera
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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
      <VStack
        px={"$3"}
        space="lg"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        position="relative"
      >
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
        <MemberList members={memberList} idWorkout={idWorkout} />
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
