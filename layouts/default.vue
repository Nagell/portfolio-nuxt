<template>
    <div class="min-h-screen flex flex-col">
        <LayoutAppHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
