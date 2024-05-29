import { IMAGE_NAME } from "@/types/session";

export const get_image_from_name = (imageName: IMAGE_NAME) => {
  if (imageName === "man_running_ready_to_workout")
    return require("@/assets/images/man_running_ready_to_workout.png");
  else if (imageName === "play_video")
    return require("@/assets/images/play_video.png");
  else if (imageName === "man_running_with_color")
    return require("@/assets/images/man_running_with_color.png");
  else if (imageName === "how_you_feel")
    return require("@/assets/images/how_you_feel.png");
  else if (imageName === "touching_with_finger")
    return require("@/assets/images/touching_with_finger.png");
};
