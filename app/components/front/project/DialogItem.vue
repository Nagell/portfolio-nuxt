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

        <div
            class="grid gap-4 overflow-y-auto py-6"
            :data-testid="testIds.index.projects.dialogContent"
        >
            <div class="flex flex-col">
                <div class="mx-auto">
                    <Card class="border-none rounded-2xl">
                        <CardContent class="w-80 aspect-[320/448] justify-start p-0">
                            <NuxtImg
                                :src="project.image"
                                alt="Project cover image"
                                class="dialog-project__image w-full h-full object-cover rounded-2xl"
                                preload
                                format="webp"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div class="bottom-0 w-full px-6 -mt-12 pb-12 flex flex-col gap-10 max-w-[35rem] mx-auto">
                    <!-- heading -->
                    <CommonTypography
                        variant="h2"
                        tag="h3"
                    >
                        {{ project.title }}
                    </CommonTypography>

                    <!-- description -->
                    <div>
                        <CommonDescription
                            :description="project.description"
                            type="p"
                        />
                    </div>

                    <!-- tags -->
                    <CommonTagList :tags="project.tags" />

                    <!-- link -->
                    <CommonExternalLink
                        v-if="project.url"
                        :href="project.url"
                        variant="h4"
                    >
                        View Project on GitHub
                    </CommonExternalLink>
                </div>
            </div>
        </div>
    </DialogContent>
</template>

<script setup lang="ts">
    import { VisuallyHidden } from 'radix-vue'

    import testIds from '~/utils/testIds'

    import type { Project } from '~~/types/projects.types'

    defineProps<{ project: Project }>()
</script>

<style lang="css">
    .dialog-project {
        opacity: var(--project-dialog-opacity, 0);
    }
    .dialog-project__image {
        filter: sepia(1) hue-rotate(10deg) saturate(300%);
    }
</style>
