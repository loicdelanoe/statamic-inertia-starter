<?php

namespace App\Support;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;

class InertiaResponseCacheHasher extends DefaultHasher
{
    public function getHashFor(Request $request): string
    {
        $baseHash = parent::getHashFor($request);

        $requestType = $this->determineRequestType($request);

        return "{$baseHash}-{$requestType}";
    }

    private function determineRequestType(Request $request): string
    {
        return match (true) {
            $this->isInertiaRequest($request) => 'inertia',
            $this->isAjaxRequest($request) => 'ajax',
            default => 'html',
        };
    }

    private function isInertiaRequest(Request $request): bool
    {
        return $request->hasHeader('X-Inertia')
            && $request->header('X-Inertia') === 'true';
    }

    private function isAjaxRequest(Request $request): bool
    {
        return $request->ajax();
    }
}
