<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const lumpSumPrincipal = ref(100000);
const lumpSumReturnRate = ref(10);
const lumpSumYears = ref(5);
const periodicInvestment = ref(25000);
const investmentFrequency = ref<"monthly" | "quarterly" | "biannual" | "yearly">(
  "yearly"
);

const frequencyOptions = [
  { value: "monthly", label: "Monthly", perYear: 12 },
  { value: "quarterly", label: "Quarterly", perYear: 4 },
  { value: "biannual", label: "Biannual", perYear: 2 },
  { value: "yearly", label: "Yearly", perYear: 1 },
];

const futureValueResult = computed(() => {
  const principal = Number(lumpSumPrincipal.value) || 0;
  const rate = Number(lumpSumReturnRate.value) || 0;
  const years = Number(lumpSumYears.value) || 0;
  const periodic = Number(periodicInvestment.value) || 0;
  const frequency =
    frequencyOptions.find((option) => option.value === investmentFrequency.value)
      ?.perYear ?? 1;

  if (principal <= 0 || years <= 0) {
    const periods = Math.max(0, years * frequency);
    return {
      presentValue: Math.max(0, principal),
      investedAmount: Math.max(0, principal),
      periodicAmount: Math.max(0, periodic * periods),
      estimatedReturns: 0,
      totalValue: Math.max(0, principal),
    };
  }

  const annualRate = rate / 100;
  const periods = Math.max(0, years * frequency);
  const periodicRate = frequency === 0 ? 0 : annualRate / frequency;
  const growthFactor = Math.pow(1 + periodicRate, periods);
  const futurePrincipal = principal * growthFactor;
  const futurePeriodic =
    annualRate === 0
      ? periodic * years
      : periodic * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);

  const totalValue = futurePrincipal + futurePeriodic;
  const periodicTotal = Math.max(0, periodic * periods);
  const investedAmount = Math.max(0, principal + periodicTotal);
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    presentValue: Math.max(0, principal),
    investedAmount,
    periodicAmount: periodicTotal,
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
          v-model="lumpSumPrincipal"
          label="Principal amount"
          unit="₹"
          :min="0"
          :max="5000000"
          :step="10000"
        />
        <SliderField
          v-model="lumpSumReturnRate"
          label="Expected return rate"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
        <SliderField
          v-model="lumpSumYears"
          label="Time period"
          unit="years"
          :min="0"
          :max="100"
          :step="1"
        />
        <label class="select-field">
          <span>Investment frequency</span>
          <select v-model="investmentFrequency">
            <option
              v-for="option in frequencyOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>
        <SliderField
          v-model="periodicInvestment"
          label="Periodic investment"
          unit="₹"
          :min="0"
          :max="1000000"
          :step="5000"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Present value (lumpsum)</span>
            <strong>{{ formatCurrency(futureValueResult.presentValue) }}</strong>
          </div>
          <div class="result-card">
            <span>Total periodic investment</span>
            <strong>{{ formatCurrency(futureValueResult.periodicAmount) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>Estimated returns</span>
            <strong>{{ formatCurrency(futureValueResult.estimatedReturns) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Total value</span>
            <strong>{{ formatCurrency(futureValueResult.totalValue) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="futureValueResult.investedAmount"
            :returns="futureValueResult.estimatedReturns"
          />
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>r = R / f
n = years * f
FV = P * (1 + r)^n + A * ((1 + r)^n - 1) / r
Invested = P + A * n
Returns = FV - Invested

Where:
P = initial principal (lumpsum)
A = periodic investment amount
R = expected annual return (as a decimal)
f = contribution frequency per year
r = return per period
n = total periods</pre>
    </section>
  </div>
</template>
