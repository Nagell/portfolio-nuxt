<template>
    <div class="min-h-screen flex flex-col">
        <app-header />
        <main class="flex-grow">
            <slot />
        </main>
        <app-footer />
    </div>
</template>
