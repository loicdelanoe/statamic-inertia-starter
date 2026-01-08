<script setup lang="ts">
interface Props {
    layout: string;
    data: any;
}

const { data: page } = defineProps<Props>();
</script>

<template>
    <article class="prose" v-html="page.content" />
</template>

<style scoped></style>
