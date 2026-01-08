import './bootstrap';
import '../css/app.css';

import { createInertiaApp, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';

import { resolveLayout } from './layouts';

import type { DefineComponent } from 'vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue'));

        if (!page.default.layout) {
            page.default.layout = (h: any, pageInstance: any) =>
                h(resolveLayout(pageInstance.props.layout, import.meta.glob<DefineComponent>('./layouts/**/*.vue')), () => pageInstance);
        }

        return page;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .component('Link', Link)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
    defaults: {
        future: {
            useDataInertiaHeadAttribute: true,
            useScriptElementForInitialPage: true,
        },
    },
});
