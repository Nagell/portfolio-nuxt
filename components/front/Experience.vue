<template>
    <CommonSection heading="Experience">
        <div class="mt-9 flex flex-col gap-14">
            <FrontExperienceItem
                v-for="experience in experienceData"
                :key="experience.id"
                :experience="experience"
            />
        </div>

        <FrontExternalLink @click="fetchCvWithBackup">
            View Full Résumé
        </FrontExternalLink>
    </CommonSection>
</template>

<script lang="ts" setup>
    import type { Experience } from '~/types/experience.types'

    const { $const } = useNuxtApp()

    interface Props {
        experienceData: Experience[]
    }

    defineProps<Props>()

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
