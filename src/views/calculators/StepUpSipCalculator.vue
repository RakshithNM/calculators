<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const monthlyInvestment = ref(5000);
const expectedReturnRate = ref(12);
const timePeriodYears = ref(10);
const stepUpPercentage = ref(10);

const stepUpSipResult = computed(() => {
  const investment = Number(monthlyInvestment.value) || 0;
  const rate = Number(expectedReturnRate.value) || 0;
  const years = Number(timePeriodYears.value) || 0;
  const stepUp = Number(stepUpPercentage.value) || 0;
  const months = Math.max(0, years * 12);

  if (months === 0 || investment <= 0) {
    return {
      investedAmount: 0,
      estimatedReturns: 0,
      totalValue: 0,
    };
  }

  const rateValue = rate / 100;
  const monthlyRate = Math.pow(1 + rateValue, 1 / 12) - 1;
  const stepUpRate = stepUp / 100;
  let totalValue = 0;
  let investedAmount = 0;

  for (let month = 0; month < months; month += 1) {
    const yearIndex = Math.floor(month / 12);
    const contribution = investment * Math.pow(1 + stepUpRate, yearIndex);
    investedAmount += contribution;
    totalValue = (totalValue + contribution) * (1 + monthlyRate);
  }

  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="monthlyInvestment"
          label="Monthly investment"
          unit="₹"
          :min="0"
          :max="200000"
          :step="500"
        />
        <SliderField
          v-model="expectedReturnRate"
          label="Expected return rate"
          unit="% p.a."
          :min="0"
          :max="30"
          :step="0.1"
        />
        <SliderField
          v-model="timePeriodYears"
          label="Time period"
          unit="years"
          :min="0"
          :max="40"
          :step="1"
        />
        <SliderField
          v-model="stepUpPercentage"
          label="Step-up percentage"
          unit="% per year"
          :min="0"
          :max="30"
          :step="0.5"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Invested amount</span>
            <strong>{{ formatCurrency(stepUpSipResult.investedAmount) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>Estimated returns</span>
            <strong>{{ formatCurrency(stepUpSipResult.estimatedReturns) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Total value</span>
            <strong>{{ formatCurrency(stepUpSipResult.totalValue) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="stepUpSipResult.investedAmount"
            :returns="stepUpSipResult.estimatedReturns"
          />
        </div>
      </div>
    </div>
  </div>
</template>
