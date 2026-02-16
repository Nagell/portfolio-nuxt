<template>
    <div
        ref="experienceItem"
        class="w-full flex md:gap-8 flex-col md:flex-row opacity-0 transition-all will-change-transform"
    >
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
                <CommonExternalLink
                    :href="experience.link"
                    variant="h4"
                    tag="h2"
                >
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
    import type { Experience } from '~~/types/experience.types'

    interface Props {
        experience: Experience
    }

    defineProps<Props>()

    const experienceItem = ref<HTMLElement | null>(null)

    /** Adds an intersection observer for animation */
    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-[text-blur_1s_forwards_400ms]')
                }
            })
        }, {
            threshold: 0.1
        })

        if (experienceItem.value) {
            observer.observe(experienceItem.value as HTMLElement)
        }
    })

    /** Format date to month and year format */
    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
</script>
