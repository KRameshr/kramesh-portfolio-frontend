export const getUniqueSkills = (skills = []) => {
  const seenNames = new Set();

  return skills.filter((skill) => {
    const normalizedName = typeof skill.name === "string"
      ? skill.name.trim().replace(/\s+/g, " ").toLowerCase()
      : "";

    if (seenNames.has(normalizedName)) return false;
    seenNames.add(normalizedName);
    return true;
  });
};
