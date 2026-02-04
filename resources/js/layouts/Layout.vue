<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';

const { navigations } = usePage().props;
</script>

<template>
    <header>
        <nav>
            <ul class="flex items-center">
                <li v-for="link in navigations['main']" :key="link.id">
                    <Link class="inline-flex px-1.5 py-2" :href="link.url">{{ link.title }}</Link>
                </li>
            </ul>
        </nav>
    </header>
    <div class="mx-auto flex flex-col items-center justify-center px-2 lg:min-h-screen">
        <slot />
    </div>
</template>

<style scoped></style>
