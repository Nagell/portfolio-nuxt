<template>
    <div>
        <section class="hero text-foreground py-20">
            <div class="container mx-auto px-4">
                <h1 class="text-5xl font-bold mb-4">
                    Welcome to My Portfolio
                </h1>
                <p class="text-xl mb-8">
                    I'm a passionate developer creating amazing web experiences.
                </p>
                <Button
                    as-child
                    variant="default"
                    size="lg"
                >
                    <NuxtLink
                        to="/projects"
                    >
                        View My Projects
                    </NuxtLink>
                </Button>
            </div>
        </section>

        <section class="projects py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8">
                    Featured Projects
                </h2>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <ProjectCard
                        v-for="project in projects"
                        :key="project.id"
                        :project="project"
                    />
                </div>
            </div>
        </section>

        <section class="skills py-16">
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

<script setup lang="ts">
    const skills = ref([
        'JavaScript', 'Vue.js', 'Nuxt.js', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Git'
    ])

    const { data: projects } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })
</script>
