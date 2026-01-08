import { createInertiaApp, Link } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createSSRApp, DefineComponent, h } from 'vue';

import { resolveLayout } from './layouts';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            title: (title) => `${title} - ${appName}`,
            resolve: async (name) => {
                const page = await resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue'));

                if (!page.default.layout) {
                    page.default.layout = (h: any, pageInstance: any) =>
                        h(resolveLayout(pageInstance.props.layout, import.meta.glob<DefineComponent>('./layouts/**/*.vue')), () => pageInstance);
                }

                return page;
            },
            setup: ({ App, props, plugin }) =>
                createSSRApp({ render: () => h(App, props) })
                    .use(plugin)
                    .component('Link', Link),
            defaults: {
                future: {
                    useDataInertiaHeadAttribute: true,
                    useScriptElementForInitialPage: true,
                },
            },
        }),
    { cluster: true },
);
