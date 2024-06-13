import { SafeAreaView, StyleSheet } from "react-native";

import { useAuth } from "@/context/auth";
import CBtn from "@/components/CBtn";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { SafeAreaViewStyle } from "@/utils/Styles";
import { DisableTextInput } from "@/components/inputs/CTextInput";
import i18n from "@/languages/i18n";
import { genreMapping } from "@/utils";

export default function TabTwoScreen() {
  const { signOut, user, profile, currentOrganization } = useAuth();
  const handleUpdateProfile = () => {};
  const initials = user?.fullName || "JD";
  const currentProfile = profile && profile[0];
  return (
    <SafeAreaView style={SafeAreaViewStyle.s}>
      <ScrollView flex={1} bgColor="white" p="$3">
        <VStack space="md" paddingBottom={10}>
          <Box>
            <Avatar size="2xl" marginHorizontal="auto" marginTop={10}>
              <AvatarFallbackText>{initials}</AvatarFallbackText>
              <AvatarImage
                source={
                  user?.profilePicture ? { uri: user?.profilePicture } : ""
                }
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
              <HStack justifyContent="center" space="sm" marginTop={10}>
                <Badge backgroundColor="$secondary" rounded="$full" padding={6}>
                  <Text textAlign="center" color="white">
                    {profile?.length && profile[0].memberType === "ar"
                      ? i18n.t("assistant_referee")
                      : i18n.t("referee")}
                  </Text>
                </Badge>
                <Badge rounded="$full" bg="$orange500" padding={6}>
                  <Text textAlign="center" color="white">
                    {currentOrganization?.initials}
                  </Text>
                </Badge>
              </HStack>
            </Box>
          </Box>
          <HStack space="md" mb={12}>
            <DisableTextInput
              placeholder={i18n.t("common.name_label")}
              containerStyle={{ width: "50%" }}
              value={user?.firstName || ""}
            />
            <DisableTextInput
              placeholder={i18n.t("common.last_name_label")}
              containerStyle={{ width: "46%" }}
              value={user?.lastName || ""}
            />
          </HStack>
          <HStack space="md" mb={12}>
            {/* Utiliza HStack para colocar los inputs lado a lado */}
            {/* <DisableTextInput
              placeholder={i18n.t("common.role_label")}
              value={currentProfile?.memberType || ""}
              containerStyle={{ width: "50%" }}
            /> */}
            <DisableTextInput
              placeholder={i18n.t("common.category_label")}
              containerStyle={{ width: "100%" }}
              value={currentProfile?.category.toString() || ""}
            />
          </HStack>
          <DisableTextInput
            placeholder={i18n.t("common.email_label")}
            value={user?.email || ""}
          />
          <HStack space="md" mb={12}>
            <DisableTextInput
              placeholder={i18n.t("about_you_screen.birthdate_label")}
              value={currentProfile?.birthdate || ""}
              containerStyle={{ width: "50%" }}
            />
            <DisableTextInput
              placeholder={i18n.t("about_you_screen.genre_label")}
              value={
                currentProfile?.gender
                  ? genreMapping[currentProfile?.gender as "m" | "f"]
                  : ""
              }
              containerStyle={{ width: "50%" }}
            />
          </HStack>
          {/* <Box marginHorizontal={20}>
            <CBtn title={i18n.t("update_info")} onPress={handleUpdateProfile} />
          </Box> */}
          <Box marginHorizontal={20}>
            <CBtn title={i18n.t("sign_out")} onPress={signOut} secondary />
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
