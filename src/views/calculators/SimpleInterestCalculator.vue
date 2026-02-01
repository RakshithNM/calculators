<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const simpleInterestPrincipal = ref(100000);
const simpleInterestRate = ref(8);
const simpleInterestYears = ref(5);

const simpleInterestResult = computed(() => {
  const principal = Number(simpleInterestPrincipal.value) || 0;
  const rate = Number(simpleInterestRate.value) || 0;
  const years = Number(simpleInterestYears.value) || 0;

  const interest = (principal * rate * years) / 100;
  const totalValue = principal + interest;

  return {
    principal: Math.max(0, principal),
    interest: Math.max(0, interest),
    totalValue: Math.max(0, totalValue),
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="simpleInterestPrincipal"
          label="Principal amount"
          unit="₹"
          :min="0"
          :max="5000000"
          :step="10000"
        />
        <SliderField
          v-model="simpleInterestRate"
          label="Interest rate"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
        <SliderField
          v-model="simpleInterestYears"
          label="Time period"
          unit="years"
          :min="0"
          :max="100"
          :step="1"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Principal amount</span>
            <strong>{{ formatCurrency(simpleInterestResult.principal) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>Estimated interest</span>
            <strong>{{ formatCurrency(simpleInterestResult.interest) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Total value</span>
            <strong>{{ formatCurrency(simpleInterestResult.totalValue) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="simpleInterestResult.principal"
            :returns="simpleInterestResult.interest"
          />
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>Interest = P * R * T / 100
Total = P + Interest</pre>
    </section>
  </div>
</template>
