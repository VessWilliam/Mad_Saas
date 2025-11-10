<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAntd } from '~/composables/useAntd'

const {
  ALayout,
  ALayoutHeader,
  ALayoutContent,
  AMenu,
  AMenuItem,
  ADrawer
} = useAntd()

const isMobile = ref(false)
const showDrawer = ref(false)

const router = useRouter()
const route = useRoute()
const selectedKeys = computed(() => [route.path])
const go = (path: string) => {
  router.push(path)
  if (isMobile.value) showDrawer.value = false
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <ALayout style="height: 100vh;">
    <div v-if="!isMobile"
      style="width: 200px; height: 100vh; background: transparent; position: fixed; overflow-y: auto;">

      <AMenu mode="inline" :selected-keys="selectedKeys" style="height: 100%; padding-top: 30px;">
        <AMenuItem key="/" @click="go('/')">Home</AMenuItem>
        <AMenuItem key="/dashboard" @click="go('/dashboard')">Dashboard</AMenuItem>
        <AMenuItem key="/reports" @click="go('/reports')">Reports</AMenuItem>
        <AMenuItem key="/settings" @click="go('/settings')">Settings</AMenuItem>
      </AMenu>

    </div>



    <ADrawer v-model:open="showDrawer" placement="left" :width="200" :closable="false">
      <AMenu :selected-keys="selectedKeys"
        style="width: 118%; height: 100%;  background: transparent; padding-top: 20px;">
        <AMenuItem key="/" @click="go('/')">Home</AMenuItem>
        <AMenuItem key="/dashboard" @click="go('/dashboard')">Dashboard</AMenuItem>
        <AMenuItem key="/reports" @click="go('/reports')">Reports</AMenuItem>
        <AMenuItem key="/settings" @click="go('/settings')">Settings</AMenuItem>
      </AMenu>
    </ADrawer>

    <ALayout :style="{ marginLeft: isMobile ? '0' : '200px', height: '100vh' }">
      <ALayoutHeader
        style="background: #292929; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; height: 64px;">
        <button v-if="isMobile" @click="showDrawer = !showDrawer" class="hamburger-btn">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <div class="fancy-title">
          <h2 style="margin: 0; color: aliceblue; font-size: 30px; padding: 24px;">Mad SaaS</h2>
        </div>
      </ALayoutHeader>

      <ALayoutContent style="background: #292929; height: calc(100vh - 64px); overflow-y: auto;">
        <slot />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>


<style scoped>
.fancy-title {
  margin: 0;
  font-size: 32px;
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

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 25px;
  padding: 0;
  margin-left: 15px;
}

.hamburger-btn .bar {
  width: 100%;
  height: 2.8px;
  padding-left: 30px;
  padding: 1px;
  background: linear-gradient(150deg, #4e4d4d, #e2e066);
  border-radius: 2px;
  transition: all 0.3s ease;
}
</style>