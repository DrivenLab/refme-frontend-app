import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
export const customConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      primary: "#58DAFC",
      primary100: "#ABECFD",
      primary200: "#82E3FD",
      primary300: "#00C1F3",
      secondary: "#090B22",
      orange: "#FF6622",
    },
  },
};
