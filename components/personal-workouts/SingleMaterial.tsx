import ConeIcon from "@/assets/svgs/ConeIcon";
import RopeIcon from "@/assets/svgs/RopeIcon";
import TredmillIcon from "@/assets/svgs/TredmillIcon";
import i18n from "@/languages/i18n";
import { Box, Text } from "@gluestack-ui/themed";
import { useMemo } from "react";
type Props = {
  material: string;
};
const SingleMaterial = ({ material }: Props) => {
  const name = useMemo(() => {
    return material.split("-")[1];
  }, [material]);
  const quantity = useMemo(() => {
    return material.split("-")[0];
  }, [material]);
  return (
    <Box flexDirection="row" alignItems="center" gap={3}>
      {name == "co" ? (
        <ConeIcon />
      ) : name == "cu" ? (
        <RopeIcon />
      ) : (
        <TredmillIcon />
      )}

      <Box flexDirection="row" gap={5}>
        <Text color="#FF6622" fontWeight={700}>
          {quantity}
        </Text>
        <Text color="#091233" fontWeight={400}>
          {i18n.t(`materials.${name}`)}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleMaterial;
