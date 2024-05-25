import { SafeAreaView, StyleSheet } from "react-native";

import { useAuth } from "@/context/auth";
import CBtn from "@/components/CBtn";
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
  const { signOut, user, profile } = useAuth();
  const initials = user?.fullName || "JD";
  return (
    <SafeAreaView>
      <VStack justifyContent="space-evenly" height="$full">
        <Box>
          <Avatar size="2xl" marginHorizontal="auto" marginTop={10}>
            <AvatarFallbackText>{initials}</AvatarFallbackText>
            <AvatarImage
              source={user?.profilePicture ? { uri: user?.profilePicture } : ""}
              alt="User Profile picture"
            />
          </Avatar>

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
                {profile?.length && profile[0].memberType === "ra"
                  ? "Asistant"
                  : "Referee"}
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
