export const array24h = Array.from({ length: 24 }, (v, i) =>
  i.toString().split("").length === 1 ? `0${i}:00` : `${i}:00`
);
