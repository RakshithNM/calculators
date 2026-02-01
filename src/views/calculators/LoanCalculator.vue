<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import { formatCurrency } from "../../utils/formatters";

const principal = ref(2000000);
const annualRate = ref(9);
const tenureYears = ref(20);
const extraPayment = ref(0);

const loanResult = computed(() => {
  const P = Number(principal.value) || 0;
  const R = Number(annualRate.value) || 0;
  const years = Number(tenureYears.value) || 0;
  const extra = Number(extraPayment.value) || 0;

  const n = Math.max(0, years * 12);
  const r = R <= 0 ? 0 : R / 100 / 12;

  const emi =
    n === 0
      ? 0
      : r === 0
        ? P / n
        : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalPayment = emi + Math.max(0, extra);

  let payoffMonths = 0;
  if (P > 0) {
    if (r === 0) {
      payoffMonths = totalPayment === 0 ? 0 : Math.ceil(P / totalPayment);
    } else if (totalPayment <= P * r) {
      payoffMonths = 0;
    } else {
      payoffMonths =
        Math.log(totalPayment / (totalPayment - P * r)) / Math.log(1 + r);
      payoffMonths = Math.ceil(payoffMonths);
    }
  }

  const yearsToPayoff = payoffMonths / 12;
  const totalPaid = emi * (n || 0);
  const interestPaid = Math.max(0, totalPaid - P);

  return {
    emi: Math.max(0, emi),
    totalPayment: Math.max(0, totalPayment),
    payoffMonths,
    yearsToPayoff,
    interestPaid,
  };
});

const formatYears = (months: number) => {
  if (!months || months <= 0) return "0 months";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;
  return `${years} years ${remainingMonths} months`;
};
</script>

<template>
  <div class="detail__panel">
    <h2>Loan EMI</h2>
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="principal"
          label="Loan principal"
          unit="₹"
          :min="0"
          :max="20000000"
          :step="50000"
        />
        <SliderField
          v-model="annualRate"
          label="Interest rate"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
        <SliderField
          v-model="tenureYears"
          label="Tenure"
          unit="years"
          :min="0"
          :max="40"
          :step="1"
        />
        <SliderField
          v-model="extraPayment"
          label="Extra payment towards principal"
          unit="₹"
          :min="0"
          :max="200000"
          :step="1000"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Monthly EMI</span>
            <strong>{{ formatCurrency(loanResult.emi) }}</strong>
          </div>
          <div class="result-card">
            <span>Total monthly payment</span>
            <strong>{{ formatCurrency(loanResult.totalPayment) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Loan payoff time</span>
            <strong>{{ formatYears(loanResult.payoffMonths) }}</strong>
          </div>
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>r = R / 12
n = 12 * years
EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
Total payment = EMI + Extra
Payoff months = log(Total / (Total - P * r)) / log(1 + r)

Where:
P = principal
R = annual interest rate (decimal)
r = monthly interest rate
n = total months
Extra = extra monthly payment towards principal</pre>
    </section>
  </div>
</template>
