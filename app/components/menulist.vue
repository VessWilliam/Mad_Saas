<script setup lang="ts">
const { AMenu } = useAntd()
const props = defineProps < {
    items: { key: string, label: string }[],
    selectedKey: string[]
} > ()

const emit = defineEmits(['select'])
</script>



<template>
    <AMenu mode="inline" :selected-keys="props.selectedKey" style="padding-top: 20px;">
        <AMenuItem v-for="item in props.items" :key="item.key" @click="emit('select', item.key)">
            {{ item.label }}
        </AMenuItem>
    </AMenu>
</template>