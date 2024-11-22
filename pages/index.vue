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
                class="mt-5"
            >
                I’m a seasoned Frontend Developer passionate about creating scalable, user-focused web applications that balance elegant design with robust technology. With expertise in Vue, Nuxt, and TypeScript, I deliver high-performing, maintainable solutions. My experience spans startups and established companies, where I’ve honed skills in responsive design, accessibility, and web performance. Beyond coding, I enjoy mentoring, knowledge sharing, and exploring new technologies to drive innovation.
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
