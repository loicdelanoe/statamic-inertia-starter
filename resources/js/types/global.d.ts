import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type PageProps<T extends Record<string, unknown> | unknown[] = Record<string, unknown> | unknown[]> = App.Data.InertiaSharedData & T;

export interface NavigationItem {
    id: string;
    title: string;
    url: string;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        navigations: Record<string, NavigationItem[]>;
        globals: any;
        old: any;
        csrf: string;
    }
}
