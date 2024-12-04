<template>
    <CommonSection
        heading="Projects"
        class="bg-gradient-to-b from-background via-foreground/[4%] to-background"
    >
        <div class="mt-9">
            <Carousel
                ref="carouselContainerRef"
                class="relative w-full"
                :opts="{
                    align: 'start',
                    watchResize: true,
                    slidesToScroll: 'auto'
                }"
            >
                <CarouselContent>
                    <FrontProjectCarouselCard
                        v-for="project in projectsData"
                        :key="project.id"
                        :project="project"
                    />
                </CarouselContent>
                <div class="relative mt-10 flex justify-center gap-6">
                    <CarouselPrevious class="w-10 h-10 relative inset-0 translate-y-0 enabled:bg-muted" />
                    <CarouselNext class="w-10 h-10 relative inset-0 translate-y-0 enabled:bg-muted" />
                </div>
            </Carousel>
        </div>
    </CommonSection>
</template>

<script setup lang="ts">
    import type { Project } from '~/types/projects.types'

    defineProps<{ projectsData: Project[] }>()
</script>
