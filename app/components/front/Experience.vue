<template>
    <CommonSection
        heading="Experience"
        :data-testid="testIds.index.experience.header"
        class="mt-16 md:mt-32 !py-16 md:!py-32 bg-gradient-to-b from-foreground/5 to-transparent to-25%"
    >
        <div
            class="mt-9 flex flex-col gap-14"
            :data-testid="testIds.index.experience.items"
        >
            <FrontExperienceItem
                v-for="experience in experienceData"
                :key="experience.id"
                :experience="experience"
            />
        </div>

        <CommonExternalLink
            :data-testid="testIds.index.experience.downloadCvButton"
            class="text-3xl"
            @click="fetchCvWithBackup"
        >
            View Full Résumé
        </CommonExternalLink>
    </CommonSection>
</template>

<script lang="ts" setup>
    import testIds from '~/utils/testIds'

    import type { Experience } from '~~/types/experience.types'

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
