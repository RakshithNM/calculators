<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { calculators } from "../data/calculators";
import SipCalculator from "./calculators/SipCalculator.vue";
import StepUpSipCalculator from "./calculators/StepUpSipCalculator.vue";
import FutureValueCalculator from "./calculators/FutureValueCalculator.vue";
import SimpleInterestCalculator from "./calculators/SimpleInterestCalculator.vue";
import CompoundInterestCalculator from "./calculators/CompoundInterestCalculator.vue";
import CagrCalculator from "./calculators/CagrCalculator.vue";
import GoalPlannerCalculator from "./calculators/GoalPlannerCalculator.vue";

const props = defineProps<{
  calculatorId: string;
}>();

const router = useRouter();
const calculator = computed(() =>
  calculators.find((item) => item.id === props.calculatorId)
);

const calculatorComponent = computed(() => {
  switch (calculator.value?.id) {
    case "sip":
      return SipCalculator;
    case "step-up-sip":
      return StepUpSipCalculator;
    case "future-value":
      return FutureValueCalculator;
    case "simple-interest":
      return SimpleInterestCalculator;
    case "compound-growth":
      return CompoundInterestCalculator;
    case "cagr":
      return CagrCalculator;
    case "goal-planner":
      return GoalPlannerCalculator;
    default:
      return null;
  }
});

const goBack = () => {
  router.push("/");
};
</script>

<template>
  <main class="shell">
    <section v-if="calculator" class="detail">
      <div class="detail__header">
        <div>
          <p class="eyebrow">Calculator</p>
          <h1>{{ calculator.title }}</h1>
          <p class="subhead">{{ calculator.description }}</p>
        </div>
        <button type="button" class="ghost" @click="goBack">All calculators</button>
      </div>

      <component :is="calculatorComponent" v-if="calculatorComponent" />

      <div class="detail__panel" v-else>
        <p class="note">
          This is a placeholder layout for the {{ calculator.title }} page.
          Connect the form and calculation logic here when ready.
        </p>
      </div>
    </section>

    <section v-else class="detail">
      <h1>Calculator not found</h1>
      <p class="subhead">Pick a tool from the home page.</p>
      <button type="button" class="ghost" @click="goBack">Go home</button>
    </section>
  </main>
</template>
