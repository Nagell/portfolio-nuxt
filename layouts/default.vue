<template>
    <div class="min-h-screen flex flex-col">
        <header class="bg-surface py-4">
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

        <main class="flex-grow">
            <slot />
        </main>

        <footer class="bg-surface py-4 mt-8">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <p>&copy; {{ new Date().getFullYear() }} My Portfolio</p>
                <div class="space-x-4">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-white hover:text-primary"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-white hover:text-primary"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>
