import DmLogo from "@/assets/svgs/DmLogo";
import { Badge, BadgeText } from "@gluestack-ui/themed";

type Props = {
  type: string;
};
function WorkoutTypeBadge(props: Props) {
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
      <DmLogo />
      <BadgeText
        color="black"
        textTransform="none"
        fontSize="$md"
        marginStart={3}
      >
        {props.type}
      </BadgeText>
    </Badge>
  );
}

export default WorkoutTypeBadge;
