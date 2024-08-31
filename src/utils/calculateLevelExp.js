// exports the required exp to level up for a given level

module.exports = (level) => {
  const output = level ** 2 * Math.log(level) || 1;

  const roundedOutput = Math.round(output);
  return roundedOutput;
};
