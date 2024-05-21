import { SafeAreaView, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
import CBtn from "@/components/CBtn";
import { useGetProfile } from "@/queries/users.query";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  Box,
  Text,
  VStack,
} from "@gluestack-ui/themed";

export default function TabTwoScreen() {
  const { signOut, user } = useAuth();
  const initials = "JD" || `${user?.firstName[0]}${user?.lastName[0]}`;
  return (
    <SafeAreaView>
      <VStack justifyContent="space-evenly" height="$full">
        <Box>
          {/*
            <Avatar size="2xl" marginHorizontal="auto" marginTop={10}>
            <AvatarFallbackText>{initials}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.profilePicture,
              }}
              alt="User Profile picture"
            />
          </Avatar>
            */}

          <Box>
            <Text
              marginTop={10}
              fontWeight="$semibold"
              fontSize={20}
              marginHorizontal="auto"
              color="secondary"
            >
              {user ? user.fullName : ""}
            </Text>
            <Badge
              backgroundColor="$secondary"
              rounded="$full"
              width={100}
              marginHorizontal="auto"
              paddingVertical={5}
            >
              <Text textAlign="center" color="white" marginHorizontal="auto">
                {/* {user?.role || ""} */}
                Referee
              </Text>
            </Badge>
          </Box>
        </Box>
        <Box marginHorizontal={20}>
          <CBtn title="Sign Out" onPress={signOut} />
        </Box>
      </VStack>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
