<template>
    <div class="w-full flex gap-32md:gap-8 flex-col md:flex-row">
        <div class="w-56 shrink-0">
            <!-- dates -->
            <CommonTypography
                tag="p"
                class="text-muted-foreground leading-7"
            >
                {{ formatDate(experience.start) }} - {{
                    experience.end ? formatDate(experience.end) : 'Present'
                }}
            </CommonTypography>
        </div>
        <div class="grow flex flex-col gap-3">
            <div>
                <!-- heading -->
                <CommonExternalLink :href="experience.link">
                    {{ experience.title.trim() }}
                </CommonExternalLink>
            </div>

            <!-- description -->
            <CommonDescription :description="experience.description" />

            <!-- tags -->
            <CommonTagList :tags="experience.tags" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { Experience } from '~/types/experience.types'

    interface Props {
        experience: Experience
    }

    defineProps<Props>()

    /** Format date to month and year format */
    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
</script>
