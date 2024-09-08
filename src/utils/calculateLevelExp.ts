// exports the required exp to level up for a given level

export default function calculateLevelExp(level) {
  const output = level ** 2 * Math.log(level) || 1;

  const roundedOutput = Math.round(output);
  return roundedOutput;
}
