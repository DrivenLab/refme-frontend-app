import { Box, Icon, Pressable, Text, PlayIcon } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Path, Svg } from "react-native-svg";
import PlayBtnIcon from "@/assets/svgs/PlayBtnIcon";

type Props = {
  wasDownloaded: boolean;
  downloadSession: () => void;
};
function DownloadSessionBtn({ wasDownloaded, downloadSession }: Props) {
  return (
    <Box flexDirection="row" alignItems="center" alignContent="center">
      <Text mr={"$1"} color="secondary">
        {wasDownloaded ? i18n.t("downloaded") : i18n.t("download")}
      </Text>
      {wasDownloaded ? (
        <Pressable p={"$1"} rounded="$full">
          <PlayBtnIcon />
        </Pressable>
      ) : (
        <Pressable p={"$1"} rounded="$full" onPress={downloadSession}>
          <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
            <Path
              d="M7 11.3984L10 14.3984M10 14.3984L13 11.3984M10 14.3984L10 6.89844M19 10.6484C19 15.619 14.9706 19.6484 10 19.6484C5.02944 19.6484 1 15.619 1 10.6484C1 5.67787 5.02944 1.64844 10 1.64844C14.9706 1.64844 19 5.67787 19 10.6484Z"
              stroke="#0F172A"
              strokeWidth="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      )}
    </Box>
  );
}

export default DownloadSessionBtn;
