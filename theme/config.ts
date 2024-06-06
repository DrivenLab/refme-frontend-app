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
      secondary400: "#090B22",
      orange: "#FF6622",
      alertYellow: "#E8D12280",
      alertYellow400: "#E8D12280",
      ligthGray: "#f2f3f4",
      ligthGray400: "#f2f3f4",
    },
  },
};
