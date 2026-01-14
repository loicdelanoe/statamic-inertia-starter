# Statamic + Inertia.js

A starter template for quickly building Statamic projects with Inertia.js and Vue 3.

> ⚠️ **Warning:** This project is currently in development. APIs and features may change without notice.

# Introduction

This starter kit provides a basic setup for building Statamic projects with Inertia.js and Vue 3. It relies on the [`statamic-inertia-adapter`](https://github.com/loicdelanoe/statamic-inertia-adapter) package to provide a seamless integration between Statamic and Inertia.js.

If you want to use another front-end framework such as React or Svelte, you may visit the [official Inertia.js documentation](https://inertiajs.com/) and the [Statamic documentation](https://statamic.dev/) for more information. It is planned to support other front-end frameworks in the future.

# Usage

## Forms

You can use Statamic’s native forms directly. A `Form` component is included in the starter kit for this purpose.

Example:

```vue
<Form :form="page.form" class="flex flex-col gap-4" v-slot="{ processing, errors, formData, success }">
    <span v-if="success" class="font-semibold text-green-500">Form submitted successfully!</span>

    <div class="flex flex-col" v-for="field in page.form.fields" :key="field.handle">
        <label class="pb-1" :for="field.handle">{{ field.display }}</label>
        <input
            :id="field.handle"
            :type="field.type"
            :name="field.handle"
            class="border"
            v-model="formData[field.handle]"
            :disabled="processing"
        />
        <span v-if="errors[field.handle]" class="mt-1 text-sm font-semibold text-red-500">{{ errors[field.handle] }}</span>
    </div>

    <button type="submit" class="bg-white px-2 py-1.5 text-black" :disabled="processing">Submit</button>
</Form>
```
### Props

- **form**  
  The Statamic form object (e.g. `page.form`).

### Slot properties

The `Form` component exposes the following variables through its slot:

- **processing**  
  `boolean` — `true` while the form submission is being processed.

- **errors**  
  `object` — validation errors returned by the form submission, indexed by field handle.

- **formData**  
  `object` — a reactive object containing the form field values.

- **success**  
  `boolean` — `true` when the form has been successfully submitted.
