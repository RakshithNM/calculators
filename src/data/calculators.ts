export type CalculatorInfo = {
  id: string;
  title: string;
  description: string;
  path: string;
};

export const calculators: CalculatorInfo[] = [
  {
    id: "sip",
    title: "SIP",
    description: "Estimate wealth growth with monthly investments.",
    path: "/sip-calculator",
  },
  {
    id: "step-up-sip",
    title: "Step-up SIP",
    description: "Estimate wealth growth with monthly investments with step up in SIP.",
    path: "/step-up-sip-calculator",
  },
  {
    id: "future-value",
    title: "Future Value",
    description: "Find the future value of a lump sum investment.",
    path: "/future-value-calculator",
  },
  {
    id: "simple-interest",
    title: "Simple Interest",
    description: "Calculate the returns when simple interest is applied.",
    path: "/simple-interest-calculator",
  },
  {
    id: "compound-growth",
    title: "Compound Interest/Return",
    description: "Calculate compounded growth on investments/loans.",
    path: "/compound-interest-return-calculator",
  },
  {
    id: "cagr",
    title: "CAGR",
    description: "Calculate Compound Annual Growth Rate of investments.",
    path: "/cagr",
  },
  // {
  //   id: "mutual-fund-returns",
  //   title: "Mutual Fund Returns Calculator",
  //   description: "Calculate historical or expected returns for a fund.",
  //   path: "/mutual-fund-returns",
  // },
  // {
  //   id: "cagr",
  //   title: "CAGR Calculator",
  //   description: "Measure investment growth rate over time.",
  //   path: "/cagr-calculator",
  // },
  // {
  //   id: "lumpsum",
  //   title: "Lumpsum Investment",
  //   description: "Project corpus size from a one-time investment.",
  //   path: "/lumpsum-investment",
  // },
  // {
  //   id: "swp",
  //   title: "SWP Calculator",
  //   description: "Estimate withdrawals while keeping money invested.",
  //   path: "/swp-calculator",
  // },
  // {
  //   id: "step-up-sip",
  //   title: "Step Up SIP Calculator",
  //   description: "Calculate returns with annual SIP increases.",
  //   path: "/step-up-sip-calculator",
  // },
  // {
  //   id: "retirement",
  //   title: "Retirement Corpus",
  //   description: "Plan how much you need to retire comfortably.",
  //   path: "/retirement-corpus",
  // },
  // {
  //   id: "goal-planner",
  //   title: "Goal Planner",
  //   description: "Calculate monthly savings for a target goal.",
  //   path: "/goal-planner",
  // },
  // {
  //   id: "ssy",
  //   title: "SSY Calculator",
  //   description: "Estimate Sukanya Samriddhi Yojana returns.",
  //   path: "/ssy-calculator",
  // },
  // {
  //   id: "ppf",
  //   title: "PPF Calculator",
  //   description: "Calculate returns on Public Provident Fund savings.",
  //   path: "/ppf-calculator",
  // },
  // {
  //   id: "epf",
  //   title: "EPF Calculator",
  //   description: "Estimate Employee Provident Fund growth.",
  //   path: "/epf-calculator",
  // },
  // {
  //   id: "fd",
  //   title: "FD Calculator",
  //   description: "Check returns on fixed deposits.",
  //   path: "/fd-calculator",
  // },
  // {
  //   id: "rd",
  //   title: "RD Calculator",
  //   description: "Check returns on recurring deposits.",
  //   path: "/rd-calculator",
  // },
  // {
  //   id: "nps",
  //   title: "NPS Calculator",
  //   description: "Calculate National Pension Scheme returns.",
  //   path: "/nps-calculator",
  // },
  // {
  //   id: "emi",
  //   title: "EMI Calculator",
  //   description: "Estimate monthly loan payments.",
  //   path: "/emi-calculator",
  // },
  // {
  //   id: "simple-interest",
  //   title: "Simple Interest Calculator",
  //   description: "Calculate interest on a principal amount.",
  //   path: "/simple-interest-calculator",
  // },
  // {
  //   id: "compound-interest",
  //   title: "Compound Interest Calculator",
  //   description: "Calculate compounded growth on investments.",
  //   path: "/compound-interest-calculator",
  // },
  // {
  //   id: "stp",
  //   title: "STP Calculator",
  //   description: "Estimate growth when transferring funds periodically.",
  //   path: "/stp-calculator",
  // },
  // {
  //   id: "goal-calculator",
  //   title: "Goal Calculator",
  //   description: "Determine savings needed to hit a target.",
  //   path: "/goal-calculator",
  // },
  // {
  //   id: "goal-sip",
  //   title: "Goal SIP Calculator",
  //   description: "Calculate SIP needed for a specific goal.",
  //   path: "/goal-sip-calculator",
  // },
  // {
  //   id: "brokerage-mtf",
  //   title: "Brokerage/MTF Calculator",
  //   description: "Estimate trading charges and MTF costs.",
  //   path: "/brokerage-mtf-calculator",
  // },
  // {
  //   id: "inflation",
  //   title: "Inflation Calculator",
  //   description: "Adjust money value for inflation.",
  //   path: "/inflation-calculator",
  // },
];
