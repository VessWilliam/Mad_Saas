<script setup>
definePageMeta({
  layout: 'default'
})
</script>



<template>
  <div class="fancy-title-wrapper">
    <h1 class="fancy-title">
      Welcome To Our Game Store
      <span class="subtitle">Have New Explore</span>
    </h1>
  </div>
</template>

<style scoped>
.fancy-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  padding: 0 1rem;
}

.fancy-title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(150deg, #4e4d4d, #e2e066);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  cursor: default;
}


.subtitle {
  display: block;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: normal;
  margin-top: 0.3em;
}
</style>
