<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Statamic\Facades\Collection;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 6);

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Collection::computed('projects', 'related_page_url', function ($entry, $value) {
            return $entry->related_page?->url();
        });
    }
}
