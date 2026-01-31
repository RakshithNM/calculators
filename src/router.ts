import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CalculatorView from "./views/CalculatorView.vue";
import { calculators } from "./data/calculators";

const calculatorRoutes = calculators.map((calculator) => ({
  path: calculator.path,
  name: calculator.id,
  component: CalculatorView,
  props: {
    calculatorId: calculator.id,
  },
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    ...calculatorRoutes,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
