<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-8 md:mt-20" />
        <FrontHero />
        <FrontExperience
            v-if="experienceData"
            :experience-data="experienceData"
        />
        <FrontProjects
            v-if="projectsData"
            :projects-data="projectsData"
        />
    </div>
</template>

<script setup lang="ts">
    /** Fetch all projects rows from the database */
    const { data: projectsData } = await useFetch('/api/projects', {
        key: 'projects',
        method: 'get'
    })

    /** Fetch all experience rows from the database */
    const { data: experienceData } = await useFetch('/api/experience', {
        key: 'experience',
        method: 'get'
    })
</script>
