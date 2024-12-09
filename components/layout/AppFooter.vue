<template>
    <footer class="py-8 mt-16">
        <div class="container flex justify-between flex-col sm:flex-row-reverse items-center gap-6">
            <CommonSocial />
            <div class="flex flex-wrap gap-6">
                <NuxtLink
                    to="/legal-notice"
                    aria-label="Navigate to legal notice"
                    class="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                    Legal Notice
                </NuxtLink>
                <NuxtLink
                    to="/privacy-policy"
                    aria-label="Navigate to privacy policy"
                    class="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                    Privacy Policy
                </NuxtLink>
            </div>
            <p>&copy; {{ new Date().getFullYear() }} Dawid Nitka</p>
        </div>
    </footer>
</template>
