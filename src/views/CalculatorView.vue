<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { calculators } from "../data/calculators";
import SliderField from "../components/SliderField.vue";
import PieChart from "../components/PieChart.vue";

const props = defineProps<{
  calculatorId: string;
}>();

const router = useRouter();
const calculator = computed(() =>
  calculators.find((item) => item.id === props.calculatorId)
);

const monthlyInvestment = ref(5000);
const expectedReturnRate = ref(12);
const timePeriodYears = ref(10);

const lumpSumPrincipal = ref(100000);
const lumpSumReturnRate = ref(10);
const lumpSumYears = ref(5);

const goBack = () => {
  router.push("/");
};

const sipResult = computed(() => {
  if (!calculator.value || calculator.value.id !== "sip") {
    return null;
  }

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
  const monthlyRate = (Math.pow((1 + rateValue), (1 / 12)) - 1);
  let totalValue = 0;

  if (monthlyRate === 0) {
    totalValue = investment * months;
  } else {
    totalValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const investedAmount = investment * months;
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
  };
});

const futureValueResult = computed(() => {
  if (!calculator.value || calculator.value.id !== "future-value") {
    return null;
  }

  const principal = Number(lumpSumPrincipal.value) || 0;
  const rate = Number(lumpSumReturnRate.value) || 0;
  const years = Number(lumpSumYears.value) || 0;

  if (principal <= 0 || years <= 0) {
    return {
      investedAmount: Math.max(0, principal),
      estimatedReturns: 0,
      totalValue: Math.max(0, principal),
    };
  }

  const totalValue = principal * Math.pow(1 + rate / 100, years);
  const estimatedReturns = Math.max(0, totalValue - principal);

  return {
    investedAmount: principal,
    estimatedReturns,
    totalValue,
  };
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
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
        <button type="button" class="ghost" @click="goBack">All tools</button>
      </div>

      <div class="detail__panel" v-if="calculator.id === 'sip' && sipResult">
        <h2>Plan your SIP</h2>
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

            <div class="chart">
              <PieChart
                :invested="sipResult.investedAmount"
                :returns="sipResult.estimatedReturns"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="detail__panel" v-else>
        <h2>Inputs you'll need</h2>
        <ul>
          <li v-for="field in calculator.fields" :key="field">
            {{ field }}
          </li>
        </ul>
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
