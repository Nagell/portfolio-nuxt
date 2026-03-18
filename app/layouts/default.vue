<template>
    <div class="min-h-screen flex flex-col">
        <ClientOnly>
            <LayoutAppHeader />
            <template #fallback>
                <div class="h-16.5" />
            </template>
        </ClientOnly>
        <main class="grow">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
