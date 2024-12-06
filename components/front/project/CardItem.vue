<template>
    <Card
        ref="card"
        class="border-none rounded-2xl absolute top-0"
    >
        <CardContent class="w-full h-full flex flex-col justify-start relative p-0 group">
            <NuxtImg
                :src="project.image"
                alt="Project cover image"
                class="w-80 aspect-[320/448] object-cover rounded-2xl mx-auto"
                placeholder
                format="webp"
                loading="lazy"
            />
            <div class="absolute bottom-0 w-full p-6 flex items-end justify-between gap-3 md:gap-6">
                <CommonTypography
                    ref="title"
                    variant="p"
                    tag="h3"
                    class="font-bold text-start text-sm md:text-base"
                >
                    {{ project.title }}
                </CommonTypography>
                <div class="w-10 h-10 shrink-0 border rounded-full relative group-hover:bg-muted transition-colors duration-300">
                    <Plus class="w-4 h-4 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
    import { Plus } from 'lucide-vue-next'

    import type { Project } from '~/types/projects.types'

    interface Props {
        project: Project
    }

    defineProps<Props>()

    const card = useTemplateRef('card')
    const title = useTemplateRef('title')

    defineExpose({
        card,
        title,
    })
</script>
