<template>
    <footer class="py-4 mt-8">
        <div class="container flex justify-between items-center">
            <p>&copy; {{ new Date().getFullYear() }} My Portfolio</p>
            <div class="space-x-4">
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-foreground hover:text-primary"
                >
                    GitHub
                </a>
                <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-foreground hover:text-primary"
                >
                    LinkedIn
                </a>
            </div>
        </div>
    </footer>
</template>
