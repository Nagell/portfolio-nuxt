<template>
    <Dialog v-model:open="isDialogOpen">
        <CarouselItem class="basis-[21rem]">
            <button
                class="rounded-2xl w-80 aspect-[320/448]"
                tabindex="0"
                role="region"
                aria-roledescription="carousel-content"
                @click="openDialog"
            >
                <Card class="border-none rounded-2xl w-full h-full">
                    <CardContent class=" w-full h-full justify-start relative p-0 group">
                        <NuxtImg
                            :src="project.image"
                            :alt="project.title"
                            class="w-full h-full object-cover rounded-2xl"
                            placeholder
                            format="webp"
                            loading="lazy"
                            sizes="xs:500px md:700px"
                        />
                        <div class="absolute bottom-0 w-full p-6 flex items-center justify-between gap-6">
                            <CommonTypography
                                variant="p"
                                tag="h3"
                                class="font-bold text-start"
                            >
                                {{ project.title }}
                            </CommonTypography>
                            <div class="w-10 h-10 shrink-0 border rounded-full relative group-hover:bg-muted transition-colors duration-300">
                                <Plus class="w-4 h-4 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </button>
        </CarouselItem>
        <FrontProjectDialogItem :project="project" />
    </Dialog>
</template>

<script setup lang="ts">
    import { Plus } from 'lucide-vue-next'
    import { ref } from 'vue'

    import type { Project } from '~/types/projects.types'

    defineProps<{ project: Project }>()
    const isDialogOpen = ref(false)

    const openDialog = () => {
        setTimeout(() => {
            isDialogOpen.value = true
        }, 400)
    }
</script>
