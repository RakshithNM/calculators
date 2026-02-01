<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const monthlyInvestment = ref(5000);
const expectedReturnRate = ref(12);
const timePeriodYears = ref(10);

const sipResult = computed(() => {
  const investment = Number(monthlyInvestment.value) || 0;
  const rate = Number(expectedReturnRate.value) || 0;
  const years = Number(timePeriodYears.value) || 0;
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
  let totalValue = 0;

  if (monthlyRate === 0) {
    totalValue = investment * months;
  } else {
    totalValue =
      investment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const investedAmount = investment * months;
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
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Invested amount</span>
            <strong>{{ formatCurrency(sipResult.investedAmount) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>Estimated returns</span>
            <strong>{{ formatCurrency(sipResult.estimatedReturns) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Total value</span>
            <strong>{{ formatCurrency(sipResult.totalValue) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="sipResult.investedAmount"
            :returns="sipResult.estimatedReturns"
          />
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>r = (1 + R)^(1/12) - 1
n = 12 * years
FV = P * ((1 + r)^n - 1) / r * (1 + r)
Invested = P * n
Returns = FV - Invested

Where:
P = monthly investment
R = expected annual return (as a decimal)
r = monthly return rate
n = total months</pre>
    </section>
  </div>
</template>
