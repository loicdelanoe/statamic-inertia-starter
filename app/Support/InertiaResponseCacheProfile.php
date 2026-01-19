<?php

namespace App\Support;

use Illuminate\Http\Request;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;

class InertiaResponseCacheProfile extends CacheAllSuccessfulGetRequests
{
    public function shouldCacheRequest(Request $request): bool
    {
        if ($request->ajax() && $request->isMethod('get')) {
            return true;
        }

        if ($this->isRunningInConsole()) {
            return false;
        }

        return $request->isMethod('get');
    }
}
