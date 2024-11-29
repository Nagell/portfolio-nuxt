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
                <FrontExternalLink :href="experience.link">
                    {{ experience.title.trim() }}
                </FrontExternalLink>
            </div>

            <!-- description -->
            <CommonTypography
                tag="ul"
                class="my-0 text-muted-foreground"
            >
                <CommonTypography
                    v-for="(description, key) in descriptionList"
                    :key="key"
                    tag="li"
                    class="text-pretty"
                >
                    {{ description }}
                </CommonTypography>
            </CommonTypography>

            <!-- tags -->
            <div
                v-if="hasTags"
                class="flex flex-wrap gap-2"
            >
                <Badge
                    v-for="(tag, key) in experience.tags"
                    :key="key"
                    variant="outline"
                >
                    {{ tag }}
                </Badge>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { Experience } from '~/types/experience.types'

    interface Props {
        experience: Experience
    }

    const props = defineProps<Props>()

    /** Format date to month and year format */
    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    /** Sanitize and split the description into an array */
    const descriptionList = computed(() => {
        return props.experience.description.split('\n')
            .filter(experience => experience !== '')
            .map(experience => experience.trim())
    })

    /** Check if there are any tags */
    const hasTags = computed(() => Array.isArray(props.experience.tags) && props.experience.tags.length > 0)

</script>
