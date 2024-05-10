import {
  Box,
  Button,
  ButtonIcon,
  DownloadIcon,
  Icon,
  Pressable,
  Text,
  PlayIcon,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";

type Props = {
  wasDownloaded: boolean;
  downloadSession: () => void;
};
function DownloadSessionBtn({ wasDownloaded, downloadSession }: Props) {
  return (
    <Box flexDirection="row" alignItems="center" alignContent="center">
      <Text mr={"$3"}>
        {wasDownloaded ? i18n.t("downloaded") : i18n.t("download")}
      </Text>
      {wasDownloaded ? (
        <Pressable p={"$1"} bgColor="black" rounded="$full">
          <Icon as={PlayIcon} w="$5" h="$5" color="white" />
        </Pressable>
      ) : (
        <Pressable
          p={"$1"}
          rounded="$full"
          borderWidth={1}
          borderColor="black"
          onPress={downloadSession}
        >
          <Icon as={DownloadIcon} w="$5" h="$5" color="black" />
        </Pressable>
      )}
    </Box>
  );
}

export default DownloadSessionBtn;
