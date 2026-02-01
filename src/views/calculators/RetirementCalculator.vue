<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency } from "../../utils/formatters";

const currentAge = ref(30);
const retirementAge = ref(60);
const lifeExpectancy = ref(85);
const monthlyExpense = ref(40000);
const inflationRate = ref(6);
const postRetReturn = ref(7);
const preRetReturn = ref(11);

const retirementResult = computed(() => {
  const ageNow = Number(currentAge.value) || 0;
  const ageRetire = Number(retirementAge.value) || 0;
  const ageEnd = Number(lifeExpectancy.value) || 0;
  const expenseNow = Number(monthlyExpense.value) || 0;
  const inflation = Number(inflationRate.value) || 0;
  const postReturn = Number(postRetReturn.value) || 0;
  const preReturn = Number(preRetReturn.value) || 0;

  const yearsToRetire = Math.max(0, ageRetire - ageNow);
  const yearsInRetirement = Math.max(0, ageEnd - ageRetire);

  const inflatedExpense =
    yearsToRetire === 0
      ? expenseNow
      : expenseNow * Math.pow(1 + inflation / 100, yearsToRetire);

  const monthsInRetirement = Math.max(0, yearsInRetirement * 12);
  const inflationMonthly =
    inflation <= 0 ? 0 : Math.pow(1 + inflation / 100, 1 / 12) - 1;
  const postRateMonthly =
    postReturn <= 0 ? 0 : Math.pow(1 + postReturn / 100, 1 / 12) - 1;

  let retirementCorpus = 0;
  if (monthsInRetirement > 0) {
    const dueMultiplier = 1 + postRateMonthly;
    if (postRateMonthly === inflationMonthly) {
      retirementCorpus = inflatedExpense * monthsInRetirement * dueMultiplier;
    } else if (postRateMonthly === 0) {
      retirementCorpus = inflatedExpense * monthsInRetirement;
    } else {
      const ratio = (1 + inflationMonthly) / (1 + postRateMonthly);
      retirementCorpus =
        inflatedExpense *
        (1 - Math.pow(ratio, monthsInRetirement)) /
        (postRateMonthly - inflationMonthly) *
        dueMultiplier;
    }
  }

  const monthsToRetire = Math.max(0, yearsToRetire * 12);
  const monthlyRate =
    preReturn <= 0 ? 0 : Math.pow(1 + preReturn / 100, 1 / 12) - 1;

  const monthlyInvestment =
    monthsToRetire === 0
      ? 0
      : monthlyRate === 0
        ? retirementCorpus / monthsToRetire
        : ((retirementCorpus * monthlyRate) /
            (Math.pow(1 + monthlyRate, monthsToRetire) - 1)) /
          (1 + monthlyRate);

  const totalInvested = monthlyInvestment * monthsToRetire;
  const estimatedReturns = Math.max(0, retirementCorpus - totalInvested);

  return {
    retirementCorpus: Math.max(0, retirementCorpus),
    monthlyInvestment: Math.max(0, monthlyInvestment),
    totalInvested: Math.max(0, totalInvested),
    estimatedReturns,
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="currentAge"
          label="Current age"
          unit="years"
          :min="18"
          :max="70"
          :step="1"
        />
        <SliderField
          v-model="retirementAge"
          label="Retirement age"
          unit="years"
          :min="30"
          :max="80"
          :step="1"
        />
        <SliderField
          v-model="lifeExpectancy"
          label="Expected lifespan"
          unit="years"
          :min="50"
          :max="100"
          :step="1"
        />
        <SliderField
          v-model="monthlyExpense"
          label="Current monthly expense"
          unit="₹"
          :min="0"
          :max="500000"
          :step="1000"
        />
        <SliderField
          v-model="inflationRate"
          label="Expected inflation"
          unit="% p.a."
          :min="0"
          :max="15"
          :step="0.1"
        />
        <SliderField
          v-model="postRetReturn"
          label="Post-retirement return"
          unit="% p.a."
          :min="0"
          :max="15"
          :step="0.1"
        />
        <SliderField
          v-model="preRetReturn"
          label="Pre-retirement return"
          unit="% p.a."
          :min="0"
          :max="20"
          :step="0.1"
        />
      </form>

      <div class="calculator-results">
        <div class="results">
          <div class="result-card result-card--invested">
            <span>Retirement corpus</span>
            <strong>{{ formatCurrency(retirementResult.retirementCorpus) }}</strong>
          </div>
          <div class="result-card result-card--total">
            <span>Monthly investment needed</span>
            <strong>{{ formatCurrency(retirementResult.monthlyInvestment) }}</strong>
          </div>
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>E_R = E_0 * (1 + i)^N
r_m = (1 + r_post)^(1/12) - 1
g_m = (1 + i)^(1/12) - 1
n = 12 * R
Corpus = E_R * (1 - ((1 + g_m) / (1 + r_m))^n) / (r_m - g_m) * (1 + r_m)
r_sip = (1 + r_pre)^(1/12) - 1
SIP = Corpus * r_sip / ((1 + r_sip)^n - 1) / (1 + r_sip)

Where:
E_0 = current monthly expense
E_R = monthly expense at retirement
i = annual inflation rate (as a decimal)
N = years to retirement
R = years in retirement
r_post = post-retirement return (annual, decimal)
r_pre = pre-retirement return (annual, decimal)
r_m = post-retirement monthly return rate
g_m = monthly inflation rate
n = total retirement months (12 * R)</pre>
    </section>
  </div>
</template>
