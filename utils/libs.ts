import { IMAGE_NAME } from "@/types/session";

export const get_image_from_name = (imageName: IMAGE_NAME) => {
  if (imageName === "man_running_ready_to_workout")
    return require("@/assets/images/man_running_ready_to_workout.png");
  else if (imageName === "play_video")
    return require("@/assets/images/play_video.png");
  else if (imageName === "man_running_with_color")
    return require("@/assets/images/man_running_with_color.png");
};
