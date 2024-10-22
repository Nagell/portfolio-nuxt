<template>
    <div>
        <section class="hero bg-surface text-white py-20">
            <div class="container mx-auto px-4">
                <h1 class="text-5xl font-bold mb-4">
                    Welcome to My Portfolio
                </h1>
                <p class="text-xl mb-8">
                    I'm a passionate developer creating amazing web experiences.
                </p>
                <NuxtLink
                    to="/projects"
                    class="bg-primary text-surface-950 px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                >
                    View My Projects
                </NuxtLink>
            </div>
        </section>

        <section class="projects py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8">
                    Featured Projects
                </h2>
                <div
                    v-if="error"
                    class="text-red-500 mb-4"
                >
                    {{ error }}
                </div>
                <div
                    v-else-if="loading"
                    class="text-white mb-4"
                >
                    Loading projects...
                </div>
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <ProjectCard
                        v-for="project in featuredProjects"
                        :key="project.id"
                        :project="project"
                    />
                </div>
            </div>
        </section>

        <section class="skills bg-surface py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8">
                    My Skills
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <SkillBadge
                        v-for="skill in skills"
                        :key="skill"
                        :skill="skill"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    import { useSupabaseClient } from '#imports'

    const supabase = useSupabaseClient()
    const featuredProjects = ref([])
    const loading = ref(true)
    const error = ref(null)

    const skills = ref([
        'JavaScript', 'Vue.js', 'Nuxt.js', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Git'
    ])

    onMounted(async () => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('projects')
                .select('*')
                .limit(3)
                .order('created_at', { ascending: false })

            if (supabaseError) throw supabaseError

            featuredProjects.value = data
        }
        catch (e) {
            console.error('Error fetching projects:', e)
            error.value = 'Failed to load projects. Please try again later.'
        }
        finally {
            loading.value = false
        }
    })
</script>
