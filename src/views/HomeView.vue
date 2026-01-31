<script setup lang="ts">
import CalculatorCard from "../components/CalculatorCard.vue";
import { calculators } from "../data/calculators";
</script>

<template>
  <main class="shell">
    <section class="hero">
      <div>
        <p class="eyebrow">Mutual Funds + Market Tools</p>
        <h1>Investment calculators built for confident decisions.</h1>
        <p class="subhead">
          Track SIPs, forecast future value, compare CAGR, and plan milestones
          with a focused suite of tools for retail investors.
        </p>
      </div>
      <div class="panel">
        <div>
          <span>Today</span>
          <strong>Smart allocation beats timing the market.</strong>
        </div>
        <div>
          <span>Tip</span>
          <strong>Rebalance every 6-12 months.</strong>
        </div>
        <div>
          <span>Signal</span>
          <strong>Track real returns after inflation.</strong>
        </div>
      </div>
    </section>

    <section class="grid">
      <CalculatorCard
        v-for="calc in calculators"
        :key="calc.id"
        :title="calc.title"
        :description="calc.description"
        :fields="calc.fields"
        :to="calc.path"
      />
    </section>
  </main>
</template>
