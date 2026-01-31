<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const compoundInterestPrincipal = ref(100000);
const compoundInterestRate = ref(10);
const compoundInterestYears = ref(5);
const compoundFrequency = ref<"yearly" | "semiannual" | "quarterly" | "monthly">(
  "yearly"
);

const compoundFrequencyOptions = [
  { value: "yearly", label: "Yearly", perYear: 1 },
  { value: "semiannual", label: "Semiannual", perYear: 2 },
  { value: "quarterly", label: "Quarterly", perYear: 4 },
  { value: "monthly", label: "Monthly", perYear: 12 },
];

const compoundInterestResult = computed(() => {
  const principal = Number(compoundInterestPrincipal.value) || 0;
  const rate = Number(compoundInterestRate.value) || 0;
  const years = Number(compoundInterestYears.value) || 0;
  const frequency =
    compoundFrequencyOptions.find(
      (option) => option.value === compoundFrequency.value
    )?.perYear ?? 1;

  const periods = Math.max(0, years * frequency);
  const periodicRate = frequency === 0 ? 0 : rate / 100 / frequency;
  const totalValue =
    periods === 0 ? principal : principal * Math.pow(1 + periodicRate, periods);
  const interest = Math.max(0, totalValue - principal);

  return {
    principal: Math.max(0, principal),
    interest,
    totalValue: Math.max(0, totalValue),
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="compoundInterestPrincipal"
          label="Principal amount"
          unit="₹"
          :min="0"
          :max="5000000"
          :step="10000"
        />
        <SliderField
          v-model="compoundInterestRate"
          label="Interest rate"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
        <SliderField
          v-model="compoundInterestYears"
          label="Time period"
          unit="years"
          :min="0"
          :max="100"
          :step="1"
        />
        <label class="select-field">
          <span>Compounding frequency</span>
          <select v-model="compoundFrequency">
            <option
              v-for="option in compoundFrequencyOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Principal amount</span>
            <strong>{{ formatCurrency(compoundInterestResult.principal) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>Estimated interest</span>
            <strong>{{ formatCurrency(compoundInterestResult.interest) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Total value</span>
            <strong>{{ formatCurrency(compoundInterestResult.totalValue) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="compoundInterestResult.principal"
            :returns="compoundInterestResult.interest"
          />
        </div>
      </div>
    </div>
  </div>
</template>
