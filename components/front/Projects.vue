<template>
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
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </CarouselContent>
        <div class="relative mt-10 flex justify-center gap-6">
            <CarouselPrevious class="relative inset-0 translate-y-0 enabled:bg-muted" />
            <CarouselNext class="relative inset-0 translate-y-0 enabled:bg-muted" />
        </div>
    </Carousel>
</template>

<script setup lang="ts">
    import type { Project } from '~/types/projects.types'

    defineProps<{ projects: Project[] }>()
</script>
