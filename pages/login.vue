<template>
    <div class="relative min-h-screen flex flex-col-reverse items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div class="relative w-full min-h-dvh flex-col bg-muted p-10 text-white lg:flex">
            <div class="absolute inset-0 bg-zinc-900" />
            <div class="relative z-20 flex items-center text-lg font-medium">
                <CommonLogoWhite class="w-12" />
            </div>
            <!-- TODO: Image -->
        </div>
        <div class="mx-auto flex min-h-dvh flex-col justify-center space-y-6 w-[350px]">
            <div class="flex flex-col space-y-2 text-center">
                <h1 class="text-2xl font-semibold tracking-tight">
                    Login to your account
                </h1>
                <p class="text-sm text-muted-foreground">
                    For now only I am allowed to access the dashboard.
                    <span class="lg:hidden">
                        You can still check how it looks like below.
                    </span>
                    <span class="hidden lg:inline">
                        You can still check how it looks like on the left side.
                    </span>
                </p>
            </div>
            <FrontUserAuthForm />
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'empty',
    })
</script>
