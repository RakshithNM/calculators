export type CalculatorInfo = {
  id: string;
  title: string;
  description: string;
  fields: string[];
  path: string;
};

export const calculators: CalculatorInfo[] = [
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Estimate wealth growth with monthly investments.",
    fields: ["Monthly investment", "Expected return", "Duration"],
    path: "/sip-calculator",
  },
  {
    id: "future-value",
    title: "Future Value Calculator",
    description: "Find the future value of a lump sum investment.",
    fields: ["Principal", "Annual return", "Years"],
    path: "/future-value-calculator",
  },
  {
    id: "cagr",
    title: "CAGR Calculator",
    description: "Measure investment growth rate over time.",
    fields: ["Start value", "End value", "Years"],
    path: "/cagr-calculator",
  },
  {
    id: "lumpsum",
    title: "Lumpsum Investment",
    description: "Project corpus size from a one-time investment.",
    fields: ["Investment", "Expected return", "Duration"],
    path: "/lumpsum-investment",
  },
  {
    id: "retirement",
    title: "Retirement Corpus",
    description: "Plan how much you need to retire comfortably.",
    fields: ["Monthly expense", "Inflation", "Years"],
    path: "/retirement-corpus",
  },
  {
    id: "goal-planner",
    title: "Goal Planner",
    description: "Calculate monthly savings for a target goal.",
    fields: ["Target amount", "Expected return", "Timeline"],
    path: "/goal-planner",
  },
];
