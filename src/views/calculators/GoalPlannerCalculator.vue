<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const goalAmount = ref(2000000);
const goalExistingInvestment = ref(300000);
const goalYears = ref(10);
const goalInflation = ref(5);
const goalReturnRate = ref(10);

const goalPlannerResult = computed(() => {
  const currentGoal = Number(goalAmount.value) || 0;
  const existing = Number(goalExistingInvestment.value) || 0;
  const years = Number(goalYears.value) || 0;
  const inflation = Number(goalInflation.value) || 0;
  const expectedReturn = Number(goalReturnRate.value) || 0;

  const futureGoal =
    years <= 0
      ? currentGoal
      : currentGoal * Math.pow(1 + inflation / 100, years);

  const annualReturn = expectedReturn / 100;
  const monthlyRate = annualReturn === 0 ? 0 : annualReturn / 12;
  const months = Math.max(0, years * 12);
  const futureExisting =
    months === 0 ? existing : existing * Math.pow(1 + monthlyRate, months);
  const shortfall = Math.max(0, futureGoal - futureExisting);

  const monthlyInvestment =
    months === 0
      ? 0
      : monthlyRate === 0
        ? shortfall / months
        : (shortfall * monthlyRate) /
          (Math.pow(1 + monthlyRate, months) - 1);

  return {
    futureGoal: Math.max(0, futureGoal),
    futureExisting: Math.max(0, futureExisting),
    monthlyInvestment: Math.max(0, monthlyInvestment),
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="goalAmount"
          label="Goal amount (today)"
          unit="₹"
          :min="0"
          :max="10000000"
          :step="10000"
        />
        <SliderField
          v-model="goalExistingInvestment"
          label="Existing investment"
          unit="₹"
          :min="0"
          :max="5000000"
          :step="10000"
        />
        <SliderField
          v-model="goalYears"
          label="Time period"
          unit="years"
          :min="0"
          :max="60"
          :step="1"
        />
        <SliderField
          v-model="goalInflation"
          label="Inflation"
          unit="% p.a."
          :min="0"
          :max="15"
          :step="0.1"
        />
        <SliderField
          v-model="goalReturnRate"
          label="Expected return"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Future goal value</span>
            <strong>{{ formatCurrency(goalPlannerResult.futureGoal) }}</strong>
          </div>
          <div class="result-card">
            <span>Future value of existing investment</span>
            <strong>{{ formatCurrency(goalPlannerResult.futureExisting) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Monthly investment needed</span>
            <strong>{{ formatCurrency(goalPlannerResult.monthlyInvestment) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="goalPlannerResult.futureExisting"
            :returns="Math.max(0, goalPlannerResult.futureGoal - goalPlannerResult.futureExisting)"
          />
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>Future Goal = Goal * (1 + i)^years
Future Existing = Existing * (1 + r_m)^n
Shortfall = Future Goal - Future Existing
Monthly SIP = Shortfall * r_m / ((1 + r_m)^n - 1)</pre>
    </section>
  </div>
</template>
