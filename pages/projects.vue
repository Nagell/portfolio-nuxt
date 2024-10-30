<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            My Projects
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const projects = ref()

    const { data, error } = await useFetch('/api/projects', { headers: useRequestHeaders([ 'cookie' ]), key: 'projects' })

    if (error.value) {
        console.error(error.value)
    }
    projects.value = data.value
</script>
