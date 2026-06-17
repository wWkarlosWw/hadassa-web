export default {
  paths: ["tests/features/**/*.feature"],
  import: ["tests/step_definitions/**/*.ts", "tests/support/**/*.ts"],
  publishQuiet: true,
  format: [
    "@serenity-js/cucumber",
    "json:./test-results/cucumber-report.json",
    "html:./test-results/cucumber-report.html",
  ],
  formatOptions: { snippetInterface: "async-await" },
};
