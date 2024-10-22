<template>
    <div class="bg-surface-800 rounded-lg overflow-hidden shadow-lg">
        <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover"
        >
        <div class="p-4 bg-surface-800">
            <h3 class="text-xl font-bold mb-2">
                {{ project.title }}
            </h3>
            <p class="text-surface-300 mb-4">
                {{ project.description }}
            </p>
            <a
                :href="project.github_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline"
            >
                View on GitHub
            </a>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        project: {
            type: Object,
            required: true
        }
    })
</script>
