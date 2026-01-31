<script setup lang="ts">
const props = defineProps<{
  label: string;
  modelValue: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const nextValue = Number(target.value);
  emit("update:modelValue", Number.isNaN(nextValue) ? 0 : nextValue);
};

const clampValue = () => {
  const step = props.step ?? 1;
  const value = Number.isNaN(props.modelValue) ? 0 : props.modelValue;
  const nextValue = Math.min(props.max, Math.max(props.min, value));
  const rounded = Math.round(nextValue / step) * step;
  emit("update:modelValue", rounded);
};
</script>

<template>
  <div class="slider-field">
    <label>
      <span class="slider-field__label">{{ label }}</span>
      <div class="slider-field__inputs">
        <input
          class="slider-field__number"
          type="number"
          :min="min"
          :max="max"
          :step="step ?? 1"
          :value="modelValue"
          @input="updateValue"
          @blur="clampValue"
        />
        <span v-if="unit" class="slider-field__unit">{{ unit }}</span>
      </div>
    </label>
    <input
      class="slider-field__range"
      type="range"
      :min="min"
      :max="max"
      :step="step ?? 1"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<style scoped lang="scss">
.slider-field {
  display: grid;
  gap: 0.6rem;
  width: 100%;
}

label {
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
  color: #2b3c50;
  width: 100%;
}

.slider-field__inputs {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.slider-field__number {
  width: min(220px, 100%);
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(15, 30, 45, 0.2);
  font: inherit;
  background: #fff;
}

.slider-field__unit {
  font-size: 0.9rem;
  color: #3c536b;
}

.slider-field__range {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  accent-color: #0b3a6e;
}
</style>
