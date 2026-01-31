<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { calculators } from "../data/calculators";

const props = defineProps<{
  calculatorId: string;
}>();

const router = useRouter();
const calculator = computed(() =>
  calculators.find((item) => item.id === props.calculatorId)
);

const goBack = () => {
  router.push("/");
};
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

      <div class="detail__panel">
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
