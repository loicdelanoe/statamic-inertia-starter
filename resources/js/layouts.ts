import { defineAsyncComponent } from 'vue';

import type { Component } from 'vue';

export function resolveLayout<T extends Component>(name: string, layouts: Record<string, Promise<T> | (() => Promise<T>)>) {
    const normalized = (name ?? 'Layout').toLowerCase();

    const getImporter = (importer: Promise<T> | (() => Promise<T>)) => (typeof importer === 'function' ? importer : () => importer);

    if (normalized === 'app') {
        return defineAsyncComponent(getImporter(layouts['./layouts/Layout.vue']));
    }

    for (const path in layouts) {
        const fileName = path
            .split('/')
            .pop()
            ?.replace('.vue', '')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace('-', '_')
            .toLowerCase();

        if (!fileName) continue;

        if (fileName === normalized) {
            const importer = layouts[path];
            return defineAsyncComponent(getImporter(importer));
        }
    }

    console.warn(`[Inertia] Layout "${name}" not found, fallback to default`);
    return defineAsyncComponent(getImporter(layouts['./layouts/Layout.vue']));
}
