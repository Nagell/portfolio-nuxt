<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-8 md:mt-20" />
        <FrontHero />
        <FrontExperience
            v-if="experienceData"
            :experience-data="experienceData"
        />
        <CommonSection
            v-if="projectsData"
            heading="Projects"
            class="bg-gradient-to-b from-background via-muted to-background"
        >
            <div class="mt-4">
                <FrontProjects :projects="projectsData" />
            </div>
        </CommonSection>
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
