<template>
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
</template>
