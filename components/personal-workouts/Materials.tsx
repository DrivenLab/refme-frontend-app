import ConeIcon from "@/assets/svgs/ConeIcon";
import { Box, VStack, Text } from "@gluestack-ui/themed";
import SingleMaterial from "./SingleMaterial";

type Props = {
  materials: string[];
};
const Materials = ({ materials }: Props) => {
  return (
    <VStack flexDirection="row" space="sm">
      {materials.map((m) => (
        <SingleMaterial material={m} key={m} />
      ))}
    </VStack>
  );
};

export default Materials;
