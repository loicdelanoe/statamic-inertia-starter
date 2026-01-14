import { router, usePage } from '@inertiajs/vue3';
import axios, { AxiosError } from 'axios';
import { computed, ref } from 'vue';

import { Field, Form, FormErrors } from '@/types';

export const useForm = (form: Form) => {
    const { errors, old, csrf, flashForm } = usePage().props;

    const ajaxSuccess = ref<boolean>(false);
    const redirect = ref<string | null>(null);
    const processing = ref(false);
    const clientErrors = ref<FormErrors>({});

    const flashSuccess = computed<boolean>(() => Boolean(flashForm?.[form.handle]?.success));
    const success = computed<boolean>(() => ajaxSuccess.value || flashSuccess.value);
    const serverErrors = computed<FormErrors>(() => {
        return errors?.[`form.${form.handle}`] ?? {};
    });

    const fieldErrors = computed<FormErrors>(() => ({
        ...serverErrors.value,
        ...clientErrors.value,
    }));

    const initialFormValues = Object.fromEntries(Object.values<Field>(form.fields).map((field) => [field.handle, old[field.handle] || '']));

    const formData = ref({
        ...initialFormValues,
        _token: old._token ?? csrf,
        [form.honeypot]: '',
    });

    const onSubmit = async () => {
        ajaxSuccess.value = false;
        clientErrors.value = {};

        processing.value = true;

        try {
            const response = await axios.post(`/!/forms/${form.handle}`, formData.value);

            ajaxSuccess.value = response.data.success;
            redirect.value = response.data.redirect;
        } catch (e) {
            const err = e as AxiosError<any>;

            clientErrors.value = err.response?.data.error || {};
        } finally {
            processing.value = false;

            if (success.value) {
                formData.value = {
                    ...initialFormValues,
                    _token: old._token ?? csrf,
                    [form.honeypot]: '',
                };
            }

            if (redirect.value) {
                router.visit(redirect.value);
            }
        }
    };

    return {
        errors: fieldErrors,
        formData,
        onSubmit,
        processing,
        success,
    };
};
