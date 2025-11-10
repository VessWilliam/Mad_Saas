<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="fancy-title" style="display: flex; justify-content: center; align-items: center; height: 80vh;">
    <h1>Welcome To Our Game Store<br />
      <p>Have New Explore</p>
    </h1>
  </div>
</template>

<style scoped>
.fancy-title {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  background: linear-gradient(150deg, #4e4d4d, #e2e066);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.3s ease;
  cursor: default;
}

.fancy-title:hover {
  transform: scale(1.1);
}
</style>