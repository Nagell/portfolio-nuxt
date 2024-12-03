<template>
    <DialogContent class="p-0 h-[80dvh] max-w-[60rem] !border-none bottom-0 top-auto !translate-y-0 !rounded-t-2xl !rounded-b-none !duration-0">
        <!-- <DialogHeader class="p-6 pb-0">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader> -->

        <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex flex-col">
                <Card class="border-none rounded-2xl mx-auto">
                    <CardContent class="w-80 aspect-[320/448] justify-start p-0 group">
                        <NuxtImg
                            :src="project.image"
                            :alt="project.title"
                            class="w-full h-full object-cover rounded-2xl"
                            placeholder
                            format="webp"
                            loading="lazy"
                            sizes="xs:500px md:700px"
                        />
                    </CardContent>
                </Card>

                <div class="bottom-0 w-full p-6 flex flex-col gap-6 max-w-[35rem] mx-auto">
                    <CommonTypography
                        variant="h2"
                        tag="h3"
                    >
                        {{ project.title }}
                    </CommonTypography>
                    <CommonDescriptionList :description="project.description" />
                </div>
            </div>
        </div>
    </DialogContent>
</template>

<script setup lang="ts">
    import type { Project } from '~/types/projects.types'

    defineProps<{ project: Project }>()
</script>
