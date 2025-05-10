export const uid = (): string =>
  Date.now().toString() +
  Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(9, "0");
