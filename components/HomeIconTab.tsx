import { useAuth } from "@/context/auth";
import { AvatarImage, Box, Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

const HomeIconTab = () => {
  const { user } = useAuth();
  if (user?.organizations.length > 0 && user.organizations[0].logoLink) {
    return (
      <Box
        rounded={100}
        overflow="hidden"
        borderColor="black"
        borderWidth={1}
        width={35}
        height={35}
      >
        <AvatarImage
          source={
            user.organizations[0].logoLink
              ? user.organizations[0].logoLink
              : require("@/assets/images/refme_logo.png")
          }
          style={styles.org_profile}
          alt="Logo de la organización"
        />
      </Box>
    );
  } else {
    return (
      <Box
        rounded={100}
        overflow="hidden"
        borderColor="black"
        borderWidth={1}
        width={35}
        height={35}
      >
        <Svg
          style={{ margin: "auto" }}
          width="22"
          height="22"
          viewBox="0 0 29 32"
          fill="none"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M0.000344459 31.7001L3.42357 31.7001C8.85344 31.7001 13.2547 27.4554 13.2547 22.2187L-0.00195312 22.2188L-0.00195147 31.7001L0.000344459 31.7001Z"
            fill="#58DAFC"
          />
          <Path
            d="M18.2703 22.2227L14.7988 22.2227L14.7988 31.6973L28.0945 31.6973C28.0945 26.4651 23.6955 22.2227 18.2703 22.2227Z"
            fill="#58DAFC"
          />
          <Path
            d="M14.0488 12.6047C13.1051 12.6047 12.2947 12.0556 11.9411 11.2695L0 11.2695L1.65661e-06 20.7442L18.271 20.7442C23.6963 20.7442 28.0953 16.5018 28.0952 11.2695L16.1564 11.2695C15.8029 12.0556 14.9924 12.6047 14.0488 12.6047Z"
            fill="#58DAFC"
          />
          <Path
            d="M28.0953 9.80868C28.0952 4.55653 23.6825 0.300777 18.2365 0.300778L0 0.300781L1.66242e-06 9.80869L11.8309 9.80869C12.0949 8.86542 12.9858 8.17237 14.0465 8.17237C15.1072 8.17237 15.998 8.86764 16.262 9.80868L28.093 9.80868L28.0953 9.80868Z"
            fill="#58DAFC"
          />
        </Svg>
      </Box>
    );
  }
};
const styles = StyleSheet.create({
  org_profile: {},
});
export default HomeIconTab;
