import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type PageProps<T extends Record<string, unknown> | unknown[] = Record<string, unknown> | unknown[]> = App.Data.InertiaSharedData & T;

export interface NavigationItem {
    id: string;
    title: string;
    url: string;
}

export interface Site {
    handle: string;
    name: string;
    lang: string;
    locale: string;
    short_locale: string;
    url: string;
    permalink: string;
    direction: string;
    attributes: Record<string, string>;
    related_page: string;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        navigations: Record<string, NavigationItem[]>;
        globals: any;
        old: any;
        csrf: string;
        sites: Record<string, Site>;
    }
}
