<template>
    <div>
        <FrontSpotlights />
        <FrontAbout />
        <FrontHero />
        <CommonSection heading="Experience">
            <div class="mt-9 flex flex-col gap-14">
                <FrontExperienceItem
                    v-for="experience in experienceData"
                    :key="experience.id"
                    :experience="experience"
                />
            </div>
        </CommonSection>
        <CommonSection heading="Projects">
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FrontProjectItem
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </CommonSection>
    </div>
</template>

<script setup lang="ts">
    /** Fetch all projects rows from the database */
    const { data: projects } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })

    /** Fetch all experience rows from the database */
    const { data: experienceData } = await useFetch('/api/experience', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'experience',
        method: 'get'
    })
</script>
