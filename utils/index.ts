const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

export const generateFakePoints = (numberPoints = 7) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    x: index + 1,
    y: randomNumber(),
  }));
