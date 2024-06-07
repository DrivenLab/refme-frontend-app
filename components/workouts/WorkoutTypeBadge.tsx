import ExerciseLogo from "@/assets/svgs/ExerciseLogo";
import { WORKOUT_TYPE } from "@/types/workout";
import { Badge, BadgeText } from "@gluestack-ui/themed";

type Props = {
  typeText: string;
  type: WORKOUT_TYPE;
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
      <ExerciseLogo type={props.type} />
      <BadgeText
        color="black"
        textTransform="none"
        fontSize="$md"
        marginStart={3}
      >
        {props.typeText}
      </BadgeText>
    </Badge>
  );
}

export default WorkoutTypeBadge;
