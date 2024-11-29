<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-8 md:mt-20" />
        <FrontHero />
        <FrontExperience
            v-if="experienceData"
            :experience-data="experienceData"
        />
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
        key: 'projects',
        method: 'get'
    })

    /** Fetch all experience rows from the database */
    const { data: experienceData } = await useFetch('/api/experience', {
        key: 'experience',
        method: 'get'
    })
</script>
