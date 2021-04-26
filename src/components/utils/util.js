export const isPairEqual = (a1, b1, a2, b2) => {
  // console.log(a1,b1,a2,b2);
  if (
    (a1.localeCompare(a2) === 0 || a1.localeCompare(b2) === 0) &&
    (b1.localeCompare(a2) === 0 || b1.localeCompare(b2) === 0)
  ) {
    return true;
  }
  return false;
};

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
