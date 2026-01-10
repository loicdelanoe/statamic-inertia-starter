<script setup lang="ts">
import { useForm } from '@/composables/useForm';
import { Form } from '@/types';

interface Props {
    form: Form;
}

const { form } = defineProps<Props>();

const { onSubmit, processing, errors, formData, success } = useForm(form);
</script>

<template>
    <form :action="`/!/forms/${form.handle}`" method="POST" @submit.prevent="onSubmit">
        <input type="hidden" name="_token" :value="formData._token" />
        <input type="text" :name="form.honeypot" v-model="formData[form.honeypot]" class="hidden" />

        <slot :processing="processing" :errors="errors" :form-data="formData" :success="success" />
    </form>
</template>

<style scoped></style>
