module.exports = {
  mutator: "typescript",
  packageManager: "npm",
  reporters: ["html", "clear-text"],
  testRunner: "jest",
  coverageAnalysis: "off",
  jest: {
    projectType: "custom",
    config: require("./jest.config.js"),
  },
  mutate: [
    "src/modules/users/user.entity.ts",
    "src/modules/subjects/subject.entity.ts",
    "src/modules/tasks/task.entity.ts",
  ],
};
