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

<script setup>
    import { onMounted, ref } from 'vue'

    import { useSupabaseClient } from '#imports'

    const supabase = useSupabaseClient()
    const projects = ref([])

    onMounted(async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching projects:', error)
        }
        else {
            projects.value = data
        }
    })
</script>
