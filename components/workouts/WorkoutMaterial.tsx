import { Badge, BadgeText } from "@gluestack-ui/themed";
type Props = {
  name: string;
};
function WorkoutMaterial(props: Props) {
  return (
    <Badge
      size="md"
      rounded="$full"
      borderColor="$primary"
      borderWidth={1}
      variant="outline"
      bgColor="transparent"
      p="$1.5"
    >
      <BadgeText color="black" fontSize="$md" textTransform="none">
        {" "}
        {props.name}
      </BadgeText>
    </Badge>
  );
}

export default WorkoutMaterial;
