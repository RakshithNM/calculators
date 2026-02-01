<script setup lang="ts">
import { computed, ref } from "vue";
import SliderField from "../../components/SliderField.vue";
import PieChart from "../../components/PieChart.vue";
import { formatCurrency, formatPercent } from "../../utils/formatters";

const cagrStartValue = ref(100000);
const cagrEndValue = ref(180000);
const cagrYears = ref(5);

const cagrResult = computed(() => {
  const startValue = Number(cagrStartValue.value) || 0;
  const endValue = Number(cagrEndValue.value) || 0;
  const years = Number(cagrYears.value) || 0;

  if (startValue <= 0 || endValue <= 0 || years <= 0) {
    return {
      startValue: Math.max(0, startValue),
      endValue: Math.max(0, endValue),
      cagr: 0,
      totalReturn: Math.max(0, endValue - startValue),
    };
  }

  const cagr = Math.pow(endValue / startValue, 1 / years) - 1;
  const totalReturn = Math.max(0, endValue - startValue);

  return {
    startValue,
    endValue,
    cagr: Math.max(0, cagr),
    totalReturn,
  };
});
</script>

<template>
  <div class="detail__panel">
    <div class="calculator-layout">
      <form class="form" @submit.prevent>
        <SliderField
          v-model="cagrStartValue"
          label="Starting value"
          unit="₹"
          :min="0"
          :max="5000000"
          :step="100"
        />
        <SliderField
          v-model="cagrEndValue"
          label="Ending value"
          unit="₹"
          :min="0"
          :max="10000000"
          :step="100"
        />
        <SliderField
          v-model="cagrYears"
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
            <span>Starting value</span>
            <strong>{{ formatCurrency(cagrResult.startValue) }}</strong>
          </div>
          <div class="result-card">
            <span>Ending value</span>
            <strong>{{ formatCurrency(cagrResult.endValue) }}</strong>
          </div>
          <div class="result-card result-card--returns">
            <span>CAGR</span>
            <strong>{{ formatPercent(cagrResult.cagr) }}</strong>
          </div>
        </div>

        <div class="chart chart-card">
          <PieChart
            :invested="cagrResult.startValue"
            :returns="cagrResult.totalReturn"
          />
        </div>
      </div>
    </div>
    <section class="formula">
      <h3>Formula</h3>
      <pre>CAGR = (End / Start)^(1/years) - 1</pre>
    </section>
  </div>
</template>
