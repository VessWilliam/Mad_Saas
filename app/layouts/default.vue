<script setup lang="ts">
import { useAntd } from "~/composables/useAntd";
import { useDevice } from '~/composables/useDevice';
import { menu } from "~/constants/menuOptions";

const { ALayout, AMenu, ADrawer, ALayoutHeader, ALayoutContent } = useAntd()
const { isMobile } = useDevice()
const showDrawer = ref(false)
const router = useRouter();
const route = useRoute();


const selectedKeys = computed(() => [route.path])
const go = (path: string) => {
    router.push(path)
    showDrawer.value = isMobile.value ? false : showDrawer.value;
}

</script>

<template>
    <ALayout style="height: 100vh;">

        <div v-if="!isMobile" class="sidebar">
            <AMenu mode="inline" :items="menu" :selected-keys="selectedKeys"
                @select="index => go(index.key as string)" />
        </div>


        <ADrawer ::body-style="{ background: '#141414', padding: '20px 0 0 0' }""
            v-model:open="showDrawer" placement="left" :width="200" :closable="false">
            <AMenu class="" mode="inline" :items="menu" :selected-keys="selectedKeys"
                @select="index => go(index.key as string)" style="background: transparent; height: 100%;" />
            <template #footer></template>
        </ADrawer>




        <ALayout :style="{ marginLeft: isMobile ? 0 : '200px', height: '100vh' }">

            <ALayoutHeader class="header">
                <button v-if="isMobile" @click="showDrawer = !showDrawer" class="hamburger-btn">
                    <span class="bar"></span><span class="bar"></span><span class="bar"></span>
                </button>
                <h2 class="title">Mad SaaS</h2>
            </ALayoutHeader>

            <ALayoutContent class="content">
                <slot />
            </ALayoutContent>
        </ALayout>
    </ALayout>


</template>

<style scoped src="~/styles/layout.css" />