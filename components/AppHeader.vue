<template>
    <header class="py-4">
        <nav class="container mx-auto px-4 flex justify-between items-center">
            <NuxtLink
                to="/"
                class="text-2xl font-bold text-primary"
            >
                My Portfolio
            </NuxtLink>
            <div class="space-x-4">
                <NuxtLink
                    to="/"
                    class="text-white hover:text-primary"
                >
                    Home
                </NuxtLink>
                <NuxtLink
                    to="/projects"
                    class="text-white hover:text-primary"
                >
                    Projects
                </NuxtLink>
                <NuxtLink
                    to="/about"
                    class="text-white hover:text-primary"
                >
                    About
                </NuxtLink>
                <NuxtLink
                    to="/admin"
                    class="text-white hover:text-primary"
                >
                    Admin
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>
