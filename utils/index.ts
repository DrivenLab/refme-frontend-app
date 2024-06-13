import i18n from "@/languages/i18n";
const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

export const generateFakePoints = (numberPoints = 7) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    x: index + 1,
    y: randomNumber(),
  }));

export const genreMapping = {
  m: i18n.t("genre_options.m"),
  f: i18n.t("genre_options.f"),
};
