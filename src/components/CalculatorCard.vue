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
  border: 1px solid rgba(11, 58, 110, 0.16);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  box-shadow: 0 18px 36px rgba(14, 28, 50, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
  position: relative;
  overflow: hidden;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    130deg,
    rgba(11, 58, 110, 0.08),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 50px rgba(14, 28, 50, 0.18);
  border-color: rgba(31, 111, 213, 0.35);
}

.card:hover::after {
  opacity: 1;
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
  background: linear-gradient(135deg, #0b3a6e, #1f6fd5);
  color: #fff;
  padding: 0.55rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  box-shadow: 0 10px 20px rgba(11, 58, 110, 0.22);
}

button:hover,
.card__link:hover {
  background: linear-gradient(135deg, #0e4c92, #2a7af0);
}
</style>
