<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="bg-zinc-100 dark:bg-zinc-900 font-sans leading-normal text-zinc-800 dark:text-zinc-400">
    @inertia
</body>

</html>
