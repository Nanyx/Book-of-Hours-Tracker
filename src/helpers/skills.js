import skillsDB from "../data/skills.json";

/**
 * @param {string[]} craftSave
 * @returns
 */
const getSkillLearned = (craftSave) =>
  skillsDB.lessons.filter((s) =>
    [
      ...new Set(
        craftSave.map((c) => `r.${c.split("_")[0].split("craft.")[1]}`),
      ),
    ].includes(s.rid),
  );

export { getSkillLearned };
