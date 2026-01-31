<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  invested: number;
  returns: number;
}>();

const radius = 46;
const circumference = 2 * Math.PI * radius;

const total = computed(() => Math.max(0, props.invested + props.returns));
const investedRatio = computed(() =>
  total.value === 0 ? 0 : props.invested / total.value
);
const investedOffset = computed(
  () => circumference * (1 - investedRatio.value)
);

const formatPercent = (value: number) =>
  `${(value * 100).toFixed(1)}%`;
</script>

<template>
  <div class="pie">
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Investment split chart"
    >
      <circle class="pie__track" cx="60" cy="60" :r="radius" />
      <circle
        class="pie__slice pie__slice--invested"
        cx="60"
        cy="60"
        :r="radius"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="investedOffset"
      />
    </svg>
    <div class="pie__legend">
      <div>
        <span class="pie__dot pie__dot--invested"></span>
        Invested amount
        <strong>{{ formatPercent(investedRatio) }}</strong>
      </div>
      <div>
        <span class="pie__dot pie__dot--returns"></span>
        Estimated returns
        <strong>{{ formatPercent(1 - investedRatio) }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pie {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}

svg {
  width: 180px;
  height: 180px;
}

.pie__track {
  fill: none;
  stroke: #6fb0ff;
  stroke-width: 16;
}

.pie__slice {
  fill: none;
  stroke-width: 16;
  transform: rotate(-90deg);
  transform-origin: 60px 60px;
  stroke-linecap: round;
}

.pie__slice--invested {
  stroke: #0b3a6e;
}

.pie__legend {
  display: grid;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: #3a5166;
}

.pie__legend div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pie__legend strong {
  margin-left: auto;
  font-size: 0.9rem;
  color: #0b3a6e;
}

.pie__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-right: 0.5rem;
}

.pie__dot--invested {
  background: #0b3a6e;
}

.pie__dot--returns {
  background: #6fb0ff;
}
</style>
