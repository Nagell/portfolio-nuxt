<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-8 md:mt-20" />
        <FrontHero />
        <CommonSection heading="Experience">
            <div class="mt-9 flex flex-col gap-14">
                <FrontExperienceItem
                    v-for="experience in experienceData"
                    :key="experience.id"
                    :experience="experience"
                />
            </div>

            <button
                class="mt-14 text-xl font-medium tracking-tight group"
                @click="fetchCvWithBackup()"
            >
                View Full Résumé
                <ArrowUpRight class="align-bottom inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
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
    import { ArrowUpRight } from 'lucide-vue-next'

    const { $const } = useNuxtApp()

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

    /** Download the CV or open linkedin in a new tab */
    async function fetchCvWithBackup() {
        await $fetch('/api/assets/', {
            query: { name: $const.assets.CV_FILE_NAME },
            method: 'get'
        }).then((data) => {
            downloadBlob(data as Blob, $const.assets.CV_FILE_NAME)
        }).catch((err) => {
            console.error(err)
            window.open($const.links.LINKEDIN, '_blank')
        })
    }
</script>
