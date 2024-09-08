export const getAngle = (xDiff: number, yDiff: number): number => {
  let angle = Math.atan2(yDiff, xDiff);
  angle *= 180 / Math.PI;
  if (angle < 0) angle += 360;

  return angle;
};
