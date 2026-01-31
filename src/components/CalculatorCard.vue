<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  to: string;
}>();
</script>

<template>
  <article class="card">
    <header>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </header>
    <RouterLink class="card__link" :to="to">Open Calculator</RouterLink>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid rgba(10, 20, 30, 0.12);
  border-radius: 16px;
  corner-shape: squircle;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  box-shadow: 0 14px 30px rgba(14, 28, 50, 0.08);
}

h3 {
  font-size: 1.15rem;
  margin: 0 0 0.25rem;
}

p {
  margin: 0;
  color: #2c3a4d;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
  color: #324155;
}

button,
.card__link {
  justify-self: start;
  align-items: center;
  border: none;
  background: #0b3a6e;
  color: #fff;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  corner-shape: squircle;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
}

button:hover,
.card__link:hover {
  background: #0e4c92;
}
</style>
