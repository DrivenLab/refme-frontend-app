import { Badge, BadgeText } from "@gluestack-ui/themed";

type Props = {
  type: string;
};
function WorkoutTypeBadge(props: Props) {
  return (
    <Badge
      size="md"
      rounded="$full"
      borderColor="#58DAFC"
      borderWidth={1}
      variant="outline"
      style={{ backgroundColor: "transparent" }}
    >
      <BadgeText color="black">{props.type}</BadgeText>
    </Badge>
  );
}

export default WorkoutTypeBadge;
