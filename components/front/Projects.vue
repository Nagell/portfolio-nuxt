<template>
    <CommonSection
        heading="Projects"
        class="gradient overflow-hidden"
        :data-testid="testIds.index.projects.header"
    >
        <div class="mt-9">
            <Carousel
                ref="carouselContainerRef"
                class="relative w-full"
                :opts="{
                    align: 'start',
                    watchResize: true,
                    slidesToScroll: 'auto',
                    dragFree: true,
                }"
            >
                <CarouselContent
                    ref="carouselContentRef"
                    :data-testid="testIds.index.projects.items"
                    class="project-cards-container"
                >
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
    import { nextTick, onMounted, ref } from 'vue'

    import testIds from '~/pages/__tests__/testIds'

    import type { Project } from '~/types/projects.types'

    defineProps<{ projectsData: Project[] }>()
    const carouselContentRef = ref<{ $el: HTMLElement } | null>(null)

    onMounted(() => {
        nextTick(() => {
            const carouselContent = carouselContentRef.value?.$el
            if (!carouselContent) return

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = carouselContent.querySelectorAll('.carousel-activator')
                        cards.forEach((card, index) => {
                            card.classList.add('animate-[project-card-slide_0.8s_forwards]');
                            (card as HTMLElement).style.animationDelay = `${index * 150}ms`
                        })
                    }
                })
            }, {
                threshold: 0.3
            })

            observer.observe(carouselContent)
        })
    })
</script>

<style scoped lang="css">
    .gradient {
        background: linear-gradient(180deg, transparent, theme('colors.foreground' / 0.06) 40%, theme('colors.foreground' / 0.06) 60%, transparent);
    }

    :deep(.carousel-activator) {
        opacity: 0;
    }
</style>
