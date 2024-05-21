import { Badge, BadgeText } from "@gluestack-ui/themed";
type Props = {
  name: string;
};
function WorkoutMaterial(props: Props) {
  return (
    <Badge
      size="md"
      rounded="$full"
      borderColor="#58DAFC"
      borderWidth={1}
      variant="outline"
      style={{ backgroundColor: "transparent" }}
    >
      <BadgeText color="black"> {props.name}</BadgeText>
    </Badge>
  );
}

export default WorkoutMaterial;
