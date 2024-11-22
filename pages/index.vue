<template>
    <div>
        <CommonSection>
            <CommonTypography
                tag="h1"
            >
                Dawid Nitka
            </CommonTypography>
            <CommonTypography
                tag="h2"
                variant="h3"
                class="text-muted-foreground mt-1.5"
            >
                Senior Front End Engineer
            </CommonTypography>
            <CommonTypography
                tag="p"
                class="text-xl mt-5"
            >
                I have extensive experience in building high-quality web applications and a strong focus on team development through knowledge sharing and collaboration. With expertise in modern web technologies such as Vue, Nx, and JavaScript/TypeScript, I deliver user-centered, scalable solutions. I promote innovation, support colleagues, and take responsibility for project success, including leading small teams.
            </CommonTypography>
            <div class="text-muted text-9xl">
                Image Placeholder
            </div>
        </CommonSection>

        <CommonSection>
            <h2 class="text-3xl font-bold mb-8">
                Featured Projects
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <FrontProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </CommonSection>

        <CommonSection>
            <h2 class="text-3xl font-bold mb-8">
                My Skills
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <FrontSkillBadge
                    v-for="skill in skills"
                    :key="skill"
                    :skill="skill"
                />
            </div>
        </CommonSection>
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
