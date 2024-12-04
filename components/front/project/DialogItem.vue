<template>
    <DialogContent
        class="dialog-project p-0 h-[90dvh] md:h-[80dvh] max-w-[60rem] !border-none bottom-0 top-auto !translate-y-0 !rounded-t-2xl !rounded-b-none !duration-500 opacity-0"
    >
        <VisuallyHidden>
            <DialogHeader class="p-4 pb-0">
                <DialogTitle>Project details</DialogTitle>
                <DialogDescription>
                    This dialog shows the details of the selected project.
                </DialogDescription>
            </DialogHeader>
        </VisuallyHidden>

        <div class="grid gap-4 overflow-y-auto py-6">
            <div class="flex flex-col">
                <div class="mx-auto">
                    <Card class="border-none rounded-2xl">
                        <CardContent class="w-80 aspect-[320/448] justify-start p-0">
                            <NuxtImg
                                :src="project.image"
                                :alt="project.title"
                                class="w-full h-full object-cover rounded-2xl"
                                preload
                                format="webp"
                                sizes="xs:500px md:700px"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div class="bottom-0 w-full p-6 flex flex-col gap-6 max-w-[35rem] mx-auto">
                    <CommonTypography
                        variant="h2"
                        tag="h3"
                    >
                        {{ project.title }}
                    </CommonTypography>
                    <CommonDescriptionList :description="project.description" />
                    <!-- TODO: This list? maybe list is not needed?  -->
                    <!-- TODO: what about tags?  -->
                    <!-- TODO: github link  -->
                </div>
            </div>
        </div>
    </DialogContent>
</template>

<script setup lang="ts">
    import { VisuallyHidden } from 'radix-vue'

    import type { Project } from '~/types/projects.types'

    defineProps<{ project: Project }>()
</script>

<style lang="css">
    .dialog-project {
        opacity: var(--project-dialog-opacity, 0);
    }
</style>
