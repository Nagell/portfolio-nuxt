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
                    class="text-foreground hover:text-primary"
                >
                    Home
                </NuxtLink>
                <NuxtLink
                    to="/projects"
                    class="text-foreground hover:text-primary"
                >
                    Projects
                </NuxtLink>
                <NuxtLink
                    to="/about"
                    class="text-foreground hover:text-primary"
                >
                    About
                </NuxtLink>
                <NuxtLink
                    to="/admin/projects"
                    class="text-foreground hover:text-primary"
                >
                    Admin
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>
