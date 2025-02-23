// exports the required exp to level up for a given level

export default (level: number) => {
  // Export the function.
  const output = level ** 2 || 1; // Calculate the output.

  const roundedOutput = Math.round(output); // Round the output.
  return roundedOutput; // Return the rounded output.
};
