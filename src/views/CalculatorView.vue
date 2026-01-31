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

const simpleInterestPrincipal = ref(100000);
const simpleInterestRate = ref(8);
const simpleInterestYears = ref(5);

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
  const periodic = Number(periodicInvestment.value) || 0;
  const frequency = frequencyOptions.find((option) => option.value === investmentFrequency.value)?.perYear ?? 1;

  if (principal <= 0 || years <= 0) {
    const periods = Math.max(
      0,
      years *
        (frequencyOptions.find((option) => option.value === investmentFrequency.value)
          ?.perYear ?? 1)
    );
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
  const futurePeriodic = annualRate === 0 ? periodic * years : periodic * ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);

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

const simpleInterestResult = computed(() => {
  if (!calculator.value || calculator.value.id !== "simple-interest") {
    return null;
  }

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

const compoundInterestResult = computed(() => {
  if (!calculator.value || calculator.value.id !== "compound-interest") {
    return null;
  }

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

      <div
        class="detail__panel"
        v-else-if="calculator.id === 'future-value' && futureValueResult"
      >
        <h2>Future value</h2>
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
                <strong>{{
                  formatCurrency(futureValueResult.presentValue)
                }}</strong>
              </div>
              <div class="result-card">
                <span>Total periodic investment</span>
                <strong>{{
                  formatCurrency(futureValueResult.periodicAmount)
                }}</strong>
              </div>
              <div class="result-card result-card--returns">
                <span>Estimated returns</span>
                <strong>{{
                  formatCurrency(futureValueResult.estimatedReturns)
                }}</strong>
              </div>
              <div class="result-card result-card--total">
                <span>Total value</span>
                <strong>{{
                  formatCurrency(futureValueResult.totalValue)
                }}</strong>
              </div>
            </div>

            <div class="chart">
              <PieChart
                :invested="futureValueResult.investedAmount"
                :returns="futureValueResult.estimatedReturns"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="detail__panel"
        v-else-if="calculator.id === 'simple-interest' && simpleInterestResult"
      >
        <h2>Simple interest</h2>
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
                <strong>{{
                  formatCurrency(simpleInterestResult.principal)
                }}</strong>
              </div>
              <div class="result-card result-card--returns">
                <span>Estimated interest</span>
                <strong>{{
                  formatCurrency(simpleInterestResult.interest)
                }}</strong>
              </div>
              <div class="result-card result-card--total">
                <span>Total value</span>
                <strong>{{
                  formatCurrency(simpleInterestResult.totalValue)
                }}</strong>
              </div>
            </div>

            <div class="chart">
              <PieChart
                :invested="simpleInterestResult.principal"
                :returns="simpleInterestResult.interest"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="detail__panel"
        v-else-if="calculator.id === 'compound-interest' && compoundInterestResult"
      >
        <h2>Compound interest</h2>
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
                <strong>{{
                  formatCurrency(compoundInterestResult.principal)
                }}</strong>
              </div>
              <div class="result-card result-card--returns">
                <span>Estimated interest</span>
                <strong>{{
                  formatCurrency(compoundInterestResult.interest)
                }}</strong>
              </div>
              <div class="result-card result-card--total">
                <span>Total value</span>
                <strong>{{
                  formatCurrency(compoundInterestResult.totalValue)
                }}</strong>
              </div>
            </div>

            <div class="chart">
              <PieChart
                :invested="compoundInterestResult.principal"
                :returns="compoundInterestResult.interest"
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
